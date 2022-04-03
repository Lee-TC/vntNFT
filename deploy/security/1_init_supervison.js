const crypto = require("crypto");
const fs = require("fs");

function genSupervisionKeyPair() {
  const keyPair1 = crypto.generateKeyPairSync("ec", {
    namedCurve: 'secp256k1',
    publicKeyEncoding: {
      type: "spki", 
      format: "pem", 
    },
    privateKeyEncoding: {
      type: "pkcs8", 
      format: "pem", 
    },
  });

  const keyPair2 = crypto.generateKeyPairSync("rsa", {
    modulusLength: 1024, 
    publicKeyEncoding: {
      type: "pkcs1", 
      format: "pem", 
    },
    privateKeyEncoding: {
      type: "pkcs1", 
      format: "pem", 
    },
  });

  fs.writeFileSync(__dirname+ "/supervision_ec_pub.pem", keyPair1.publicKey);
  fs.writeFileSync(__dirname+ "/supervision_ec_priv.pem", keyPair1.privateKey);
  fs.writeFileSync(__dirname+ "/supervision_rsa_pub.pem", keyPair2.publicKey);
  fs.writeFileSync(__dirname+ "/supervision_rsa_priv.pem", keyPair2.privateKey);


}

module.exports = genSupervisionKeyPair()