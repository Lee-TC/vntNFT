const mint = require("./chainFunc/mint")
const changeTokenPrice = require("./chainFunc/changeTokenPrice")
const getTokenPrice = require("./chainFunc/getTokenPrice")
const getTokenName = require("./chainFunc/getTokenName")
const ownerOf = require("./chainFunc/ownerOf")
const getTotalToken = require("./chainFunc/getTotalToken")
const getTransactionReceipt = require("./base/getTransactionReceipt")
const $buyToken = require("./chainFunc/$buyToken")
const getTokenHash = require("./chainFunc/getTokenHash")
const getTokenStatus = require("./chainFunc/getTokenStatus")
const getRole = require("./chainFunc/getRole")
const setRole = require("./chainFunc/setRole")
const IssueCerti = require("./chainFunc/IssueCerti")
const VerifyCerti = require("./chainFunc/VerifyCerti")
// IssueCerti(3)

 console.log(VerifyCerti(3))
// console.log()
// console.log(getRole('0x7a0b95d73f9d58881f95b3487344c7108463e887'))
//for (i=0;i<getTotalToken();i++)
//{
//    console.log(getTokenName(3),getTokenPrice(3),getTokenStatus(3));
//}


