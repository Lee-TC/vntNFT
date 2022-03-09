var CommonData = require('../base/common');
var crypto = require("crypto")
var fs = require("fs")
var Vnt = require("vnt");

let vnt = new Vnt();

const abi = JSON.parse(CommonData.abi);
vnt.setProvider(new vnt.providers.HttpProvider(CommonData.url));
const Certifi=fs.readFileSync(__dirname+"/../Certificate.json",'utf-8');
const privateKey = fs.readFileSync(__dirname + "/../../ks/id_rsa_priv.pem", "utf8");
const publicKey = fs.readFileSync(__dirname + "/../../ks/id_rsa_pub.pem", "utf8");

const VC = (tokenId) => {
    let contract = vnt.core.contract(abi).at(CommonData.cAddr);
    let result;
    try {
        const signature = contract.getTokenCerti.call(tokenId);
        const data = Buffer.from(Certifi);
        result = crypto.verify('SHA256',data,publicKey,Buffer.from(signature,'base64'));
    }
    catch (e) {
        result = "未知错误";
    }

    return result.toString();
}

const VerifyCerti = (tokenId) => {
    return (() => {
        return VC(tokenId)
    }).call()
}
module.exports = VerifyCerti