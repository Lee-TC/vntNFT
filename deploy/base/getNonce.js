var CommonData = require('../base/common');
var account = require("../base/account")
var Vnt = require("vnt");

let vnt = new Vnt();

vnt.setProvider(new vnt.providers.HttpProvider(CommonData.url));

const gNo = (account) => {
    let result;
    try {
        result = vnt.core.getTransactionCount(account.address);
    }
    catch (e) {
        result = "未知错误";
    }
    return result.toString();
}

const getNonce = (account) => {
    return (() => {
        return gNo(account)
    }).call()
}
module.exports = getNonce