var CommonData = require('../base/common');
const send = require("../base/send")
const getNonce = require("../base/getNonce")
const account = require("../base/account")
const getTokenName = require("./getTokenName")
const getTokenHash = require("./getTokenHash")
const crypto = require("crypto");
const fs = require("fs");
var Vnt = require("vnt");
let vnt = new Vnt();

const IC = (tokenId) =>{
    let result;
    Certifi = {
        tokenId:tokenId,
        tokenname:getTokenName(tokenId),
        tokenhash:getTokenHash(tokenId),
        timestamp:Date().toString(),
        IssueOrg:"National NFT certificates center",
    }
    fs.writeFileSync(__dirname +"/../Certificate.json",JSON.stringify(Certifi))
    const privateKey = fs.readFileSync(__dirname + "/../../ks/id_rsa_priv.pem", "utf8");
    const data = Buffer.from(JSON.stringify(Certifi));
    console.log(data.toString())
    const sign = crypto.sign('SHA256', data , privateKey);
    const signature = sign.toString('base64');
    try {
        send("IssueCerti",[tokenId,signature],account,getNonce(account));
    }
    catch (e) {
        result = "未知错误";
    }
    return result;
}

const IssueCerti = (tokenId) => {
    return (() => {
        return IC(tokenId)
    }).call()
}
module.exports = IssueCerti