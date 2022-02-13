var fs = require("fs")
const abiFile = "../../contract/output/ERC721.abi"
const wasmabi = fs.readFileSync(abiFile)
const abiContent = wasmabi.toString("utf-8")
const contractAddr = "0x8bf6a9f32918625c728a5342847c92cb4b97f33d";
const url = 'http://47.111.100.232:8880';

const CommonData = {
    abi: abiContent,
    cAddr: contractAddr,
    url: url
}
module.exports = CommonData;