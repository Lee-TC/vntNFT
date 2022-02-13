var CommonData = require('../base/common');
var Vnt = require("vnt");

let vnt = new Vnt();

// const abi = JSON.parse(CommonData.abi);
vnt.setProvider(new vnt.providers.HttpProvider(CommonData.url));

const bOf = (address) => {
    let contract = vnt.core.contract(JSON.parse(CommonData.abi)).at(CommonData.cAddr);
    let result;
    try {
        result = contract.balanceOf.call(address);
    }
    catch (e) {
        result = "未知错误";
    }
    return result.toString();
}

const balanceOf = (address) => {
    return (() => {
        return bOf(address)
    }).call()
}
module.exports = balanceOf