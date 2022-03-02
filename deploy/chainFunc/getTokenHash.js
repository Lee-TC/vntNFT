var CommonData = require('../base/common');
var Vnt = require("vnt");

let vnt = new Vnt();

const abi = JSON.parse(CommonData.abi);
vnt.setProvider(new vnt.providers.HttpProvider(CommonData.url));

const gH = (tokenId) => {
    let contract = vnt.core.contract(abi).at(CommonData.cAddr);
    let result;
    try {
        result = contract.getTokenHash.call(tokenId);
    }
    catch (e) {
        result = "未知错误";
    }
    return result.toString();
}

const getTokenHash = (tokenId) => {
    return (() => {
        return gH(tokenId)
    }).call()
}
module.exports = getTokenHash