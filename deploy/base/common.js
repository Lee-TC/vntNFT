var fs = require("fs")
const abiFile = "../contract/output/ERC721.abi"
const wasmabi = fs.readFileSync(abiFile)
const abiContent = wasmabi.toString("utf-8")
const contractAddr = "0x07225eb5bae0f8b79b50e5969ae56d635c86438e";
const url = 'http://47.111.100.232:8880';

const CommonData = {
    abi: abiContent,
    cAddr: contractAddr,
    url: url
}
module.exports = CommonData;