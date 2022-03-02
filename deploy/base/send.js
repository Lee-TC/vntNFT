var CommonData = require('./common');
const account = require("../base/account")
var Vnt = require("vnt");
var vntKit = require("vnt-kit");
var Tx = require("ethereumjs-tx").Transaction;
let Cm = require("ethereumjs-common").default
let vnt = new Vnt();


vnt.setProvider(new vnt.providers.HttpProvider(CommonData.url));

function send(funct, list, Account, nonce, Amount = 0) {
    var contract = vnt.core.contract(JSON.parse(CommonData.abi));
    var data = contract.packFunctionData(funct, list);

    var options = {
        to: CommonData.cAddr,
        nonce: vnt.toHex(nonce),
        gasPrice: vnt.toHex(100000000000),
        gasLimit: vnt.toHex(4000000),
        value: vnt.toHex(Amount),
        data: data
    }
    var chain = Cm.forCustomChain(1, { name: 'testnet', networkId: 2, chainId: 2, url: CommonData.url }, 'petersburg');
    var tx = new Tx(options, { common: chain });
    tx.sign(Buffer.from(Account.privateKey.substring(2,), "hex")); //用账户签名
    var serializedTx = tx.serialize();
    var result;
    vnt.core.sendRawTransaction('0x' + serializedTx.toString('hex'), (err, txHash) => { //发送交易
        if (err) {
            console.log("err happedned: ", err);
            return;
        }
        else {
            console.log("transaction hash: ", txHash);
        }
    })
}

module.exports = send;