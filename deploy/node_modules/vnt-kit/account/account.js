/*
    This file is part of vnt.js.
    vnt.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    vnt.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    You should have received a copy of the GNU Lesser General Public License
    along with vnt.js.  If not, see <http://www.gnu.org/licenses/>.
*/

"use strict";

var scryptsy = require('scrypt.js');
var cryp = (typeof global === 'undefined') ? require('crypto-browserify') : require('crypto');
var Hash = require("../utils/hash");
var elliptic = require("elliptic");
var uuid = require('uuid');

var secp256k1 = new elliptic.ec("secp256k1");

function isString(object) {
    return typeof object === 'string' ||
        (object && object.constructor && object.constructor.name === 'String');
}

function isObject(object) {
    return object !== null && !(Array.isArray(object)) && typeof object === 'object';
}

function toChecksum(address) {
  var addressHash = Hash.keccak256s(address.slice(2));
  var checksumAddress = "0x";
  for (var i = 0; i < 40; i++) {
    checksumAddress += parseInt(addressHash[i + 2], 16) > 7 ? address[i + 2].toUpperCase() : address[i + 2];
  }
  return checksumAddress;
};

function privateKeyToAccount(privateKey) {
    var buffer = new Buffer(privateKey.slice(2), "hex");
    var ecKey = secp256k1.keyFromPrivate(buffer);
    var publicKey = "0x" + ecKey.getPublic(false, 'hex').slice(2);
    var publicHash = Hash.keccak256(publicKey);
    var address = toChecksum("0x" + publicHash.slice(-40));
    return {
      address: address,
      privateKey: privateKey
    };
}

function decrypt(v3Keystore, password, nonStrict) {
    /* jshint maxcomplexity: 10 */

    if(!isString(password)) {
        throw new Error('No password given.');
    }

    var json = (isObject(v3Keystore)) ? v3Keystore : JSON.parse(nonStrict ? v3Keystore.toLowerCase() : v3Keystore);

    if (json.version !== 3) {
        throw new Error('Not a valid V3 keystore file');
    }

    var derivedKey;
    var kdfparams;
    if (json.crypto.kdf === 'scrypt') {
        kdfparams = json.crypto.kdfparams;

        // FIXME: support progress reporting callback
        derivedKey = scryptsy(new Buffer(password), new Buffer(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
    } else if (json.crypto.kdf === 'pbkdf2') {
        kdfparams = json.crypto.kdfparams;

        if (kdfparams.prf !== 'hmac-sha256') {
            throw new Error('Unsupported parameters to PBKDF2');
        }

        derivedKey = cryp.pbkdf2Sync(new Buffer(password), new Buffer(kdfparams.salt, 'hex'), kdfparams.c, kdfparams.dklen, 'sha256');
    } else {
        throw new Error('Unsupported key derivation scheme');
    }

    var ciphertext = new Buffer(json.crypto.ciphertext, 'hex');

    var mac = Hash.keccak256(Buffer.concat([ derivedKey.slice(16, 32), ciphertext ])).replace('0x','');
    if (mac !== json.crypto.mac) {
        throw new Error('Key derivation failed - possibly wrong password');
    }

    var decipher = cryp.createDecipheriv(json.crypto.cipher, derivedKey.slice(0, 16), new Buffer(json.crypto.cipherparams.iv, 'hex'));
    var seed = '0x'+ Buffer.concat([ decipher.update(ciphertext), decipher.final() ]).toString('hex');

    return privateKeyToAccount(seed);
};

function encrypt(privateKey, password, options) {
    /* jshint maxcomplexity: 20 */
    var account = privateKeyToAccount(privateKey);

    options = options || {};
    var salt = options.salt || cryp.randomBytes(32);
    var iv = options.iv || cryp.randomBytes(16);

    var derivedKey;
    var kdf = options.kdf || 'scrypt';
    var kdfparams = {
        dklen: options.dklen || 32,
        salt: salt.toString('hex')
    };

    if (kdf === 'pbkdf2') {
        kdfparams.c = options.c || 262144;
        kdfparams.prf = 'hmac-sha256';
        derivedKey = cryp.pbkdf2Sync(new Buffer(password), salt, kdfparams.c, kdfparams.dklen, 'sha256');
    } else if (kdf === 'scrypt') {
        // FIXME: support progress reporting callback
        kdfparams.n = options.n || 8192; // 2048 4096 8192 16384
        kdfparams.r = options.r || 8;
        kdfparams.p = options.p || 1;
        derivedKey = scryptsy(new Buffer(password), salt, kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
    } else {
        throw new Error('Unsupported kdf');
    }

    var cipher = cryp.createCipheriv(options.cipher || 'aes-128-ctr', derivedKey.slice(0, 16), iv);
    if (!cipher) {
        throw new Error('Unsupported cipher');
    }

    var ciphertext = Buffer.concat([ cipher.update(new Buffer(account.privateKey.replace('0x',''), 'hex')), cipher.final() ]);

    var mac = Hash.keccak256(Buffer.concat([ derivedKey.slice(16, 32), new Buffer(ciphertext, 'hex') ])).replace('0x','');

    return {
        version: 3,
        id: uuid.v4({ random: options.uuid || cryp.randomBytes(16) }),
        address: account.address.toLowerCase().replace('0x',''),
        crypto: {
            ciphertext: ciphertext.toString('hex'),
            cipherparams: {
                iv: iv.toString('hex')
            },
            cipher: options.cipher || 'aes-128-ctr',
            kdf: kdf,
            kdfparams: kdfparams,
            mac: mac.toString('hex')
        }
    };
};

module.exports = {
    decrypt: decrypt,
    encrypt: encrypt,
    privateKeyToAccount: privateKeyToAccount
}
