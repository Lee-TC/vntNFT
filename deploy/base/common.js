var fs = require("fs")
const abiFile = "../contract/output/ERC721.abi"
const wasmabi = fs.readFileSync(abiFile)
const abiContent = wasmabi.toString("utf-8")
const contractAddr = "0x978e115b5c29aace81a1ff6feac8e2bf9716e58a";
const url = 'http://47.111.100.232:8880';

const CommonData = {
    abi: abiContent,
    cAddr: contractAddr,
    url: url
}
module.exports = CommonData;