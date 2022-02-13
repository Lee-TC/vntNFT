var CommonData = require('../base/common');
const send = require("../base/send")
const getNonce = require("../base/getNonce")
const account = require("../base/account")
var Vnt = require("vnt");
let vnt = new Vnt();

const CTP = (tokenId,newPrice) => {
    let result;
    try {
        send("changeTokenPrice",[tokenId,newPrice],account,getNonce(account));
    }
    catch (e) {
        result = "未知错误";
    }
    return result;
}

const changeTokenPrice = (tokenId,newPrice) => {
    return (() => {
        return CTP(tokenId,newPrice)
    }).call()
}
module.exports = changeTokenPrice