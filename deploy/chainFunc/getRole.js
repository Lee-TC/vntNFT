var CommonData = require('../base/common');
var Vnt = require("vnt");

let vnt = new Vnt();

const abi = JSON.parse(CommonData.abi);
vnt.setProvider(new vnt.providers.HttpProvider(CommonData.url));

const gR = (User) => {
    let contract = vnt.core.contract(abi).at(CommonData.cAddr);
    let result;
    try {
        result = contract.getRole.call(User);
    }
    catch (e) {
        result = "未知错误";
    }
    return result.toString();
}

const getRole = (User) => {
    return (() => {
        return gR(User)
    }).call()
}
module.exports = getRole