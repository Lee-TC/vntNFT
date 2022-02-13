var CommonData = require('../base/common');
const send = require("../base/send")
const getNonce = require("../base/getNonce")
const account = require("../base/account")
var Vnt = require("vnt");
let vnt = new Vnt();

const Mt = (name,price,hash) => {
    let result;
    try {
        send("mint",[name,price,hash],account,getNonce(account));
    }
    catch (e) {
        result = "未知错误";
    }
    return result;
}

const mint = (name,price,hash) => {
    return (() => {
        return Mt(name,price,hash)
    }).call()
}
module.exports = mint