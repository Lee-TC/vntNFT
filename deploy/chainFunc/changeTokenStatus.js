var CommonData = require('../base/common');
const send = require("../base/send")
const getNonce = require("../base/getNonce")
const account = require("../base/account")
var Vnt = require("vnt");
let vnt = new Vnt();

const CTS = (tokenId,newStatus) => {
    let result;
    try {
        send("changeTokenStatus",[tokenId,newStatus],account,getNonce(account));
    }
    catch (e) {
        result = "未知错误";
    }
    return result;
}

const changeTokenStatus = (tokenId,newStatus) => {
    return (() => {
        return CTP(tokenId,newStatus)
    }).call()
}
module.exports = changeTokenStatus