var Vnt = require("vnt");
var vnt = new Vnt();
var CommonData = require('../base/common');

vnt.setProvider(new vnt.providers.HttpProvider(CommonData.url));

function gTR(txHash) {
    return vnt.core.getTransactionReceipt(txHash);
}

const getTransactionReceipt = (txHash) => {
    return (() => {
        return gTR(txHash)
    }).call()
}

module.exports = getTransactionReceipt;