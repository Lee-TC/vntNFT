const mint = require("./mint")
const changeTokenPrice = require("./changeTokenPrice")
const getTokenPrice = require("./getTokenPrice")
const getTokenName = require("./getTokenName")
const ownerOf = require("./ownerOf")
const getTotalToken = require("./getTotalToken")
const getTransactionReceipt = require("../base/getTransactionReceipt")
const $buyToken = require("./$buyToken")
console.log(getTokenName(0),getTokenPrice(0),ownerOf(0));
// changeTokenPrice(0,8)
// $buyToken(0,3)


