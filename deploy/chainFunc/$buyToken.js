var CommonData = require('../base/common');
const send = require("../base/send")
const getNonce = require("../base/getNonce")
const account = require("../base/account")
var Vnt = require("vnt");
let vnt = new Vnt();

const BT = (tokenId,Amount) => {
    let result;
    try {
        send("$buyToken",[tokenId],account,getNonce(account),Amount);
    }
    catch (e) {
        result = "未知错误";
    }
    return result;
}

const $buyToken = (tokenId,Amount) => {
    return (() => {
        return BT(tokenId,Amount)
    }).call()
}
module.exports = $buyToken