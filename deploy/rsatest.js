const crypto = require("crypto");
const fs = require("fs");
function genKeyPair() {
  // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 512, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: "pkcs1", // "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
    privateKeyEncoding: {
      type: "pkcs1", // "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
  });
  // Create the public key file
  fs.writeFileSync(__dirname + "/../ks/id_rsa_pub.pem", keyPair.publicKey);
  // Create the private key file
  fs.writeFileSync(__dirname + "/../ks/id_rsa_priv.pem", keyPair.privateKey);
}
// Generates the keypair
genKeyPair();

const privateKey = fs.readFileSync(__dirname + "/../ks/id_rsa_priv.pem", "utf8");

// JSON object
const person = {
	name: "Raktim Banerjee",
	email:"example@gmail.com",
	address: "4 main street"
}

// Convert Stringified json data to buffer
const data = Buffer.from( JSON.stringify(person) );

// Sign the data and returned signature in buffer
const sign = crypto.sign("SHA256", data , privateKey);

// Convert returned buffer to base64
const signature = sign.toString('base64');

// Printing the signature
console.log(`Signature:\n\n ${signature}`);
