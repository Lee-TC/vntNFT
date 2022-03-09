const crypto = require("crypto");

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

privateKey=keyPair.privateKey;
publicKey=keyPair.publicKey;

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

const result = crypto.verify("SHA256",data,publicKey,Buffer.from(signature,'base64'))

console.log()
