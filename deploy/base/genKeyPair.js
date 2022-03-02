const crypto = require("crypto");
const fs = require("fs");

function genKeyPair() {
  
  const keyPair = crypto.generateKeyPairSync("rsa", {
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
  
  fs.writeFileSync(__dirname+ "/../../ks/id_rsa_pub.pem", keyPair.publicKey);
  fs.writeFileSync(__dirname+ "/../../ks/id_rsa_priv.pem", keyPair.privateKey);
}

module.exports=genKeyPair