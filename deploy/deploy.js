var Vnt = require("vnt")
var vntkit = require("vnt-kit")
var Tx = require("ethereumjs-tx").Transaction
var Cm = require("ethereumjs-common").default
var fs = require("fs")
var url = 'http://47.111.100.232:8880';
var vnt = new Vnt();

var ksdir="../ks/";
var kfile="Wed, 22 Dec 2021 11_51_40 GMT";
var password="vnt123456";

function openAccount(file, passwd) {
    var content = fs.readFileSync(file).toString("utf-8")
    return vntkit.account.decrypt(content, passwd, false)
}

var account1 = openAccount(ksdir + kfile, password);

var from1 = '0x59b534adc54a79d20d07d379383bbfc8306fe93b';
var from1Keystore = '{"version":3,"id":"7cf78ea8-ebd1-4fe5-92d9-d77ce6ac9cdb","address":"59b534adc54a79d20d07d379383bbfc8306fe93b","crypto":{"ciphertext":"eb3d5a688144727971ec787d47cc69c69186143845c6c0f759c9efe44d5dd47e","cipherparams":{"iv":"00b054f71bac52fc7bc9b06d01bff5c1"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"47d818c860f2d6ff6da48087f420b6d1d3fa8330d6bddff2d93ad92631462be5","n":8192,"r":8,"p":1},"mac":"e03638d378bb0c704490252d40310728e90281a4b560b23a8ff4ade4e9da4a27"}}';
var pass1 = 'zyl7758258';
var account = vntkit.account.decrypt(from1Keystore, pass1, false);

//定义代码路径
var codeFile = "../contract/output/ERC721.compress"
//定义abi路径
var abiFile = "../contract/output/ERC721.abi"
//读取abi数据
var wasmabi = fs.readFileSync(abiFile)
//将abi数据解析成json结构
var abi = JSON.parse(wasmabi.toString("utf-8"))
vnt.setProvider(new vnt.providers.HttpProvider(url)); //链接到rpc地址

function deployWasmContract() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            var contract = vnt.core.contract(abi).codeFile(codeFile);
            var data = contract.packContructorData();
            var gas = vnt.core.estimateGas({ data: data });
            var nonce = vnt.core.getTransactionCount(account.address);
            var options = {
                nonce: vnt.toHex(nonce),
                gasPrice: vnt.toHex(100000000000),
                gasLimit: vnt.toHex(gas),
                value: "0x00",
                data: data,
            }
            var chain = Cm.forCustomChain(1, { name: 'testnet', networkId: 2, chainId: 2, url: url }, 'petersburg');
            var tx = new Tx(options, { common: chain });
            tx.sign(Buffer.from(account.privateKey.substring(2,), "hex")); //用账户签名
            var serializedTx = tx.serialize();
            vnt.core.sendRawTransaction('0x' + serializedTx.toString('hex'), (err, txHash) => { //发送交易
                if (err) {
                    console.log("err happedned: ", err);
                }
                else {
                    console.log("transaction hash: ", txHash);
                    resolve(txHash);
                }
            })
        }, 100)
    })
}


function getContractAddress(transactionHash) {
    return vnt.core.getTransactionReceipt(transactionHash);
}

function send(funct, list, Account, nonce, Amount=0) {
    var contract = vnt.core.contract(abi);
    var data = contract.packFunctionData(funct, list);

    var options = {
        to: contractAddress,
        nonce: vnt.toHex(nonce),
        gasPrice: vnt.toHex(100000000000),
        gasLimit: vnt.toHex(4000000),
        value: vnt.toHex(Amount),
        data: data
    }
    var chain = Cm.forCustomChain(1, { name: 'testnet', networkId: 2, chainId: 2, url: url }, 'petersburg');
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

function getNonce(account) {
    return vnt.core.getTransactionCount(account.address);
}

// deployWasmContract();
contractAddress=getContractAddress("0xb89f62fba7bb4589427a599439281d4d1a6bd76986079bac318f21fa67c1adbb")['contractAddress'];
console.log(contractAddress)
var contract = vnt.core.contract(abi).at(contractAddress);
send('mint',["lee",1,'1'],account,getNonce(account));
send('mint',["Irving",2,'2'],account,getNonce(account)+1);
send('mint',["LeBorn James",23,'3'],account1,getNonce(account1));
send('mint',["young",11,'6'],account1,getNonce(account1)+1);
// // send('$buyToken',[4],account,getNonce(account),4e18);
// send('changeTokenPrice',[0,6],account,getNonce(account));
// send("mint",["Ben simmons",10,"12"],account,getNonce(account));
// var result=contract.ownerOf.call(4);
// console.log(result.toString());

// const tmp=vnt.core.getTransactionReceipt('0xefcb44dfdc0ea83baddfd36cc363c2fe88d40791c7b9c6ebb5c1e39ead034af6');
// console.log(tmp);
