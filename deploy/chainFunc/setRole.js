var CommonData = require('../base/common');
const send = require("../base/send")
const getNonce = require("../base/getNonce")
const account = require("../base/account")
var Vnt = require("vnt");
let vnt = new Vnt();

const SR = (User,Role) => {
    let result;
    try {
        send("setRole",[User,Role],account,getNonce(account));
    }
    catch (e) {
        result = "未知错误";
    }
    return result;
}

const setRole = (User,Role) => {
    return (() => {
        return SR(User,Role)
    }).call()
}
module.exports = setRole