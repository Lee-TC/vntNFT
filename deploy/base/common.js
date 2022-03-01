var fs = require("fs")
const abiFile = "../contract/output/ERC721.abi"
const wasmabi = fs.readFileSync(abiFile)
const abiContent = wasmabi.toString("utf-8")
const contractAddr = "0xaa2380dc30ca193b441b999c3290a550eca52c65";
const url = 'http://47.111.100.232:8880';

const CommonData = {
    abi: abiContent,
    cAddr: contractAddr,
    url: url
}
module.exports = CommonData;