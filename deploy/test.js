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
const IssueCerti = require("./chainFunc/IssueCerti")
IssueCerti(1)
// for (i=0;i<getTotalToken();i++)
// {
//     console.log(getTokenName(i),getTokenPrice(i),getTokenStatus(i));
// }


