#!/usr/bin/env node

var Vnt = require('../index.js');
var vnt = new Vnt();

vnt.setProvider(new vnt.providers.HttpProvider('http://localhost:8545'));

var coinbase = vnt.core.coinbase;
console.log(coinbase);

var balance = vnt.core.getBalance(coinbase);
console.log(balance.toString(10));
