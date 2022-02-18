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
/**
 * @file vnt.js
 * @authors:
 *   Jeffrey Wilcke <jeff@ethdev.com>
 *   Marek Kotewicz <marek@ethdev.com>
 *   Marian Oancea <marian@ethdev.com>
 *   Fabian Vogelsteller <fabian@ethdev.com>
 *   Gav Wood <g@ethdev.com>
 * @date 2014
 */

var RequestManager = require('./vnt/requestmanager');
var Iban = require('./vnt/iban');
var Core = require('./vnt/methods/core');
var Shh = require('./vnt/methods/shh');
var Net = require('./vnt/methods/net');
var Personal = require('./vnt/methods/personal');
var Swarm = require('./vnt/methods/swarm');
var Settings = require('./vnt/settings');
var version = require('./version.json');
var utils = require('./utils/utils');
var sha3 = require('./utils/sha3');
var Hash = require('./utils/hash');
var extend = require('./vnt/extend');
var Batch = require('./vnt/batch');
var Property = require('./vnt/property');
var HttpProvider = require('./vnt/httpprovider');
var IpcProvider = require('./vnt/ipcprovider');
var BigNumber = require('bignumber.js');



function Vnt (provider) {
    this._requestManager = new RequestManager(provider);
    this.currentProvider = provider;
    this.core = new Core(this);
    this.shh = new Shh(this);
    this.net = new Net(this);
    this.hash = Hash;
    this.utils = utils;
    this.personal = new Personal(this);
    this.bzz = new Swarm(this);
    this.settings = new Settings();
    this.version = {
        api: version.version
    };
    this.providers = {
        HttpProvider: HttpProvider,
        IpcProvider: IpcProvider
    };
    this._extend = extend(this);
    this._extend({
        properties: properties()
    });
}

// expose providers on the class
Vnt.providers = {
    HttpProvider: HttpProvider,
    IpcProvider: IpcProvider
};

Vnt.prototype.setProvider = function (provider) {
    this._requestManager.setProvider(provider);
    this.currentProvider = provider;
};

Vnt.prototype.reset = function (keepIsSyncing) {
    this._requestManager.reset(keepIsSyncing);
    this.settings = new Settings();
};

Vnt.prototype.BigNumber = BigNumber;
Vnt.prototype.toHex = utils.toHex;
Vnt.prototype.toAscii = utils.toAscii;
Vnt.prototype.toUtf8 = utils.toUtf8;
Vnt.prototype.fromAscii = utils.fromAscii;
Vnt.prototype.fromUtf8 = utils.fromUtf8;
Vnt.prototype.toDecimal = utils.toDecimal;
Vnt.prototype.fromDecimal = utils.fromDecimal;
Vnt.prototype.toBigNumber = utils.toBigNumber;
Vnt.prototype.toWei = utils.toWei;
Vnt.prototype.fromWei = utils.fromWei;
Vnt.prototype.isAddress = utils.isAddress;
Vnt.prototype.isChecksumAddress = utils.isChecksumAddress;
Vnt.prototype.toChecksumAddress = utils.toChecksumAddress;
Vnt.prototype.isIBAN = utils.isIBAN;
Vnt.prototype.padLeft = utils.padLeft;
Vnt.prototype.padRight = utils.padRight;


Vnt.prototype.sha3 = function(string, options) {
    return '0x' + sha3(string, options);
};

/**
 * Transforms direct icap to address
 */
Vnt.prototype.fromICAP = function (icap) {
    var iban = new Iban(icap);
    return iban.address();
};

var properties = function () {
    return [
        new Property({
            name: 'version.node',
            getter: 'vnt_clientVersion'
        }),
        new Property({
            name: 'version.network',
            getter: 'net_version',
            inputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'version.vntchain',
            getter: 'core_protocolVersion',
            inputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'version.whisper',
            getter: 'shh_version',
            inputFormatter: utils.toDecimal
        })
    ];
};

Vnt.prototype.isConnected = function(){
    return (this.currentProvider && this.currentProvider.isConnected());
};

Vnt.prototype.createBatch = function () {
    return new Batch(this);
};

module.exports = Vnt;
