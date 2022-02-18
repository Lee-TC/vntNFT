<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Contents**

- [VNT JavaScript app API for 0.2x.x](#vnt-javascript-app-api-for-02xx)
  - [Getting Started](#getting-started)
    - [Using callbacks](#using-callbacks)
    - [Batch requests](#batch-requests)
    - [A note on big numbers in vnt.js](#a-note-on-big-numbers-in-vntjs)
  - [VNT.js API Reference](#vntjs-api-reference)
      - [vnt.version.api](#vntversionapi)
      - [vnt.version.node](#vntversionnode)
      - [vnt.version.network](#vntversionnetwork)
      - [vnt.version.vntchain](#vntversionvntchain)
      - [vnt.version.whisper](#vntversionwhisper)
      - [vnt.isConnected](#vntisconnected)
      - [vnt.setProvider](#vntsetprovider)
      - [vnt.currentProvider](#vntcurrentprovider)
      - [vnt.reset](#vntreset)
      - [vnt.sha3](#vntsha3)
      - [vnt.toHex](#vnttohex)
      - [vnt.toAscii](#vnttoascii)
      - [vnt.fromAscii](#vntfromascii)
      - [vnt.toDecimal](#vnttodecimal)
      - [vnt.fromDecimal](#vntfromdecimal)
      - [vnt.fromWei](#vnttowei)
      - [vnt.toWei](#vnttowei)
      - [vnt.toBigNumber](#vnttobignumber)
      - [vnt.isAddress](#vntisaddress)
      - [vnt.net.listening](#vntnetlistening)
      - [vnt.net.peerCount](#vntnetpeercount)
    - [vnt.core](#vntcore)
      - [vnt.core.defaultAccount](#vntcoredefaultaccount)
      - [vnt.core.defaultBlock](#vntcoredefaultblock)
      - [vnt.core.syncing](#vntcoresyncing)
      - [vnt.core.isSyncing](#vntcoreissyncing)
      - [vnt.core.coinbase](#vntcorecoinbase)
      - [vnt.core.producing](#vntcoreproducing)
      - [vnt.core.gasPrice](#vntcoregasprice)
      - [vnt.core.accounts](#vntcoreaccounts)
      - [vnt.core.blockNumber](#vntcoreblocknumber)
      - [vnt.core.getBalance](#vntcoregetbalance)
      - [vnt.core.getStorageAt](#vntcoregetstorageat)
      - [vnt.core.getCode](#vntcoregetcode)
      - [vnt.core.getBlock](#vntcoregetblock)
      - [vnt.core.getBlockTransactionCount](#vntcoregetblocktransactioncount)
      - [vnt.core.getTransaction](#vntcoregettransaction)
      - [vnt.core.getTransactionFromBlock](#vntcoregettransactionfromblock)
      - [vnt.core.getTransactionReceipt](#vntcoregettransactionreceipt)
      - [vnt.core.getTransactionCount](#vntcoregettransactioncount)
      - [vnt.core.sendTransaction](#vntcoresendtransaction)
      - [vnt.core.sendRawTransaction](#vntcoresendrawtransaction)
      - [vnt.core.sign](#vntcoresign)
      - [vnt.core.call](#vntcorecall)
      - [vnt.core.estimateGas](#vntcoreestimategas)
      - [vnt.core.filter](#vntcorefilter)
      - [vnt.core.contract](#vntcorecontract)
        - [Contract Methods](#contract-methods)
        - [Contract Events](#contract-events)
        - [Contract allEvents](#contract-allevents)
        - [Contract codeFile](#contract-codefile)
        - [Contract packContructorData](#contract-packcontructordata)
        - [Contract packFunctionData](#contract-packfunctiondata)
        - [Contract unPackOutput](#contract-unpackoutput)
      - [Account decrypt](#account-decrypt)
      - [Account encrypt](#account-encrypt)
      - [vnt.core.namereg](#vntcorenamereg)
      - [vnt.core.sendIBANTransaction](#vntcoresendibantransaction)
      - [vnt.core.iban.fromAddress](#vntcoreibanfromaddress)
      - [vnt.core.iban.fromBban](#vntcoreibanfrombban)
      - [vnt.core.iban.createIndirect](#vntcoreibancreateindirect)
      - [vnt.core.iban.isValid](#vntcoreibanisvalid)
      - [vnt.core.iban.isDirect](#vntcoreibanisdirect)
      - [vnt.core.iban.isIndirect](#vntcoreibanisindirect)
      - [vnt.core.iban.checksum](#vntcoreibanchecksum)
      - [vnt.core.iban.institution](#vntcoreibaninstitution)
      - [vnt.core.iban.client](#vntcoreibanclient)
      - [vnt.core.iban.address](#vntcoreibanaddress)
      - [vnt.core.iban.toString](#vntcoreibantostring)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# VNT JavaScript app API for 0.2x.x

 **NOTE: These docs are for vnt.js version 0.2x.x.**
 To make your app work on VNTChain, you can use the `vnt` object provided by the [vnt.js library](https://github.com/vntchain/vnt.js). Under the hood it communicates to a local node through [RPC calls](https://github.com/vntchain/wiki/wiki/JSON-RPC). vnt.js works with any VNTChain node which exposes an RPC layer.
 `vnt` contains the `core` object - `vnt.core` (for specifically VNTChain blockchain interactions) <!-- and the `shh` object - `vnt.shh` (for Whisper interaction) -->. Over time we'll introduce other objects for each of the other vnt protocols. Working  [examples can be found here](https://github.com/vntchain/vnt.js/tree/master/example).
 If you want to look at some more sophisticated examples using vnt.js check out these [useful app patterns](https://github.com/vntchain/wiki/wiki/Useful-Ðapp-Patterns).

## Getting Started

* [Adding vnt](#adding-vnt)
* [Using Callbacks](#using-callbacks)
* [Batch requests](#batch-requests)
* [A note on big numbers in vnt.js](#a-note-on-big-numbers-in-vntjs)
* [-> API Reference](#vntjs-api-reference)

### Adding vnt

First you need to get vnt.js into your project. This can be done using the following methods:
- npm: `npm install vnt`
- bower: `bower install vnt`
- meteor: `meteor add vntchain:vnt`
- vanilla: link the `dist./vnt.min.js`  

Then you need to create a vnt instance, setting a provider.
To make sure you don't overwrite the already set provider when in mist, check first if the vnt is available:

```js
if (typeof vnt !== 'undefined') {
  vnt = new VNT(vnt.currentProvider);
} else {
  // set the provider you want from VNT.providers
  vnt = new VNT(new VNT.providers.HttpProvider("http://localhost:8545"));
}
```

 After that you can use the [API](vntjs-api-reference) of the `vnt` object.

### Using callbacks

 As this API is designed to work with a local RPC node, all its functions use synchronous HTTP requests by default.
 If you want to make an asynchronous request, you can pass an optional callback as the last parameter to most functions.
All callbacks are using an [error first callback](http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/) style:

 ```js
vnt.core.getBlock(48, function(error, result){
    if(!error)
        console.log(JSON.stringify(result));
    else
        console.error(error);
})
```

### Batch requests

 Batch requests allow queuing up requests and processing them at once.
 **Note** Batch requests are not faster! In fact making many requests at once will in some cases be faster, as requests are processed asynchronously. Batch requests are mainly useful to ensure the serial processing of requests.

 ```js
var batch = vnt.createBatch();
batch.add(vnt.core.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', callback));
batch.add(vnt.core.contract(abi).at(address).balance.request(address, callback2));
batch.execute();
```
### A note on big numbers in vnt.js
 You will always get a BigNumber object for number values as JavaScript is not able to handle big numbers correctly.
Look at the following examples:
 ```js
"101010100324325345346456456456456456456"
// "101010100324325345346456456456456456456"
101010100324325345346456456456456456456
// 1.0101010032432535e+38
```
 vnt.js depends on the [BigNumber Library](https://github.com/MikeMcl/bignumber.js/) and adds it automatically.
 ```js
var balance = new BigNumber('131242344353464564564574574567456');
// or var balance = vnt.core.getBalance(someAddress);
 balance.plus(21).toString(10); // toString(10) converts it to a number string
// "131242344353464564564574574567477"
```
 The next example wouldn't work as we have more than 20 floating points, therefore it is recommended to always keep your balance in *wei* and only transform it to other units when presenting to the user:
```js
var balance = new BigNumber('13124.234435346456466666457455567456');
 balance.plus(21).toString(10); // toString(10) converts it to a number string, but can only show upto 20 digits
// "13145.23443534645646666646" // your number will be truncated after the 20th digit
```
## VNT.js API Reference
 * [vnt](#vnt)
  * [version](#vntversionapi)
     * [api](#vntversionapi)
     * [node/getNode](#vntversionnode)
     * [network/getNetwork](#vntversionnetwork)
     * [vntchain/getVntchain:](#vntversionvntchain)
     * [whisper/getWhisper](#vntversionwhisper)
  * [isConnected()](#vntisconnected)
  * [setProvider(provider)](#vntsetprovider)
  * [currentProvider](#vntcurrentprovider)
  * [reset()](#vntreset)
  * [sha3(string, options)](#vntsha3)
  * [toHex(stringOrNumber)](#vnttohex)
  * [toAscii(hexString)](#vnttoascii)
  * [fromAscii(textString)](#vntfromascii)
  * [toDecimal(hexString)](#vnttodecimal)
  * [fromDecimal(number)](#vntfromdecimal)
  * [fromWei(numberStringOrBigNumber, unit)](#vntfromwei)
  * [toWei(numberStringOrBigNumber, unit)](#vnttowei)
  * [toBigNumber(numberOrHexString)](#vnttobignumber)
  * [isAddress(hexString)](#vntisaddress)
  * [net](#vntnet)
    * [listening/getListening](#vntnetlistening)
    * [peerCount/getPeerCount](#vntnetpeercount)
  * [core](#vntcore)
    * [defaultAccount](#vntcoredefaultaccount)
    * [defaultBlock](#vntcoredefaultblock)
    * [syncing/getSyncing](#vntcoresyncing)
    * [isSyncing](#vntcoreissyncing)
    * [coinbase/getCoinbase](#vntcorecoinbase)
    * [hashrate/getHashrate](#vntcorehashrate)
    * [gasPrice/getGasPrice](#vntcoregasprice)
    * [accounts/getAccounts](#vntcoreaccounts)
    * [producing/getProducing](#vntcoreproducing)
    * [blockNumber/getBlockNumber](#vntcoreblocknumber)
    * [getBalance(address)](#vntcoregetbalance)
    * [getStorageAt(address, position)](#vntcoregetstorageat)
    * [getCode(address)](#vntcoregetcode)
    * [getBlock(hash/number)](#vntcoregetblock)
    * [getBlockTransactionCount(hash/number)](#vntcoregetblocktransactioncount)
    * [getTransaction(hash)](#vntcoregettransaction)
    * [getTransactionFromBlock(hashOrNumber, indexNumber)](#vntcoregettransactionfromblock)
    * [getTransactionReceipt(hash)](#vntcoregettransactionreceipt)
    * [getTransactionCount(address)](#vntcoregettransactioncount)
    * [sendTransaction(object)](#vntcoresendtransaction)
    * [sendRawTransaction(object)](#vntcoresendrawtransaction)
    * [sign(object)](#vntcoresign)
    * [call(object)](#vntcorecall)
    * [estimateGas(object)](#vntcoreestimategas)
    * [filter(array (, options) )](#vntcorefilter)
        - [watch(callback)](#vntcorefilter)
        - [stopWatching(callback)](#vntcorefilter)
        - [get()](#vntcorefilter)
    * [Contract(abiArray)](#vntcorecontract)
    * [contract.myMethod()](#contract-methods)
    * [contract.myEvent()](#contract-events)
    * [contract.allEvents()](#contract-allevents)
    * [contract.codeFile()](#contract-codefile)
    * [contract.packContructorData()](#contract-packcontructordata)
    * [contract.packFunctionData()](#contract-packfunctiondata)
    * [contract.unPackOutput()](#contract-unpackoutput)
    <!-- * [account.decrypt](#account-decrypt)
    * [account.encrypt](#account-encrypt) -->
    * [namereg](#vntcorenamereg)
    * [sendIBANTransaction](#vntcoresendibantransaction)
    * [iban](#vntcoreiban)
      * [fromAddress](#vntcoreibanfromaddress)
      * [fromBban](#vntcoreibanfrombban)
      * [createIndirect](#vntcoreibancreateindirect)
      * [isValid](#vntcoreibanisvalid)
      * [isDirect](#vntcoreibanisdirect)
      * [isIndirect](#vntcoreibanisindirect)
      * [checksum](#vntcoreibanchecksum)
      * [institution](#vntcoreibaninstitution)
      * [client](#vntcoreibanclient)
      * [address](#vntcoreibanaddress)
      * [toString](#vntcoreibantostring)
  * [shh](#vntshh)
    * [post(postObject)](#vntshhpost)
    * [hasIdentity(hexString)](#vntshhhaveidentity)
    * [newGroup(_id, _who)](#vntshhnewgroup)
    * [addToGroup(_id, _who)](#vntshhaddtogroup)
    * [filter(object/string)](#vntshhfilter)
      * [watch(callback)](#vntshhfilter)
      * [stopWatching(callback)](#vntshhfilter)
      * [get(callback)](#vntshhfilter)

### Usage

#### vnt
The `vnt` object provides all methods.

##### Example

 ```js
var VNT = require('vnt');
// create an instance of vnt using the HTTP provider.
// NOTE in mist vnt is already available, so check first if it's available before instantiating
var vnt = new VNT(new VNT.providers.HttpProvider("http://localhost:8545"));
```
###### Example using HTTP Basic Authentication
```js
var VNT = require('vnt');
var vnt = new VNT(new VNT.providers.HttpProvider("http://localhost:8545", 0, BasicAuthUsername, BasicAuthPassword));
//Note: HttpProvider takes 4 arguments (host, timeout, user, password)
```

***

#### vnt.version.api
 ```js
vnt.version.api
```

##### Returns

 `String` - The vntchain js api version.

##### Example

 ```js
var version = vnt.version.api;
console.log(version); // "0.2.0"
```

***

#### vnt.version.node
     vnt.version.node
    // or async
    vnt.version.getNode(callback(error, result){ ... })

##### Returns

 `String` - The client/node version.

##### Example

 ```js
var version = vnt.version.node;
console.log(version); // "Mist/v0.9.3/darwin/go1.4.1"
```

***

#### vnt.version.network
     vnt.version.network
    // or async
    vnt.version.getNetwork(callback(error, result){ ... })

##### Returns

 `String` - The network protocol version.

##### Example

 ```js
var version = vnt.version.network;
console.log(version); // 54
```

***

#### vnt.version.vntchain
     vnt.version.vntchain
    // or async
    vnt.version.getVntchain(callback(error, result){ ... })

##### Returns

 `String` - The vntchain protocol version.

##### Example

 ```js
var version = vnt.version.vntchain;
console.log(version); // 0x3f
```

***

#### vnt.version.whisper
     vnt.version.whisper
    // or async
    vnt.version.getWhisper(callback(error, result){ ... })

##### Returns

 `String` - The whisper protocol version.

##### Example

 ```js
var version = vnt.version.whisper;
console.log(version); // 20
```

***

#### vnt.isConnected
     vnt.isConnected()
 Should be called to check if a connection to a node exists
#### Parameters

none

##### Returns

 `Boolean`

##### Example

 ```js
if(!vnt.isConnected()) {

   // show some dialog to ask the user to start a node
 } else {

   // start vnt filters, calls, etc

}
```

***

#### vnt.setProvider
     vnt.setProvider(provider)
 Should be called to set provider.
#### Parameters

none

##### Returns

 `undefined`

##### Example

 ```js
vnt.setProvider(new vnt.providers.HttpProvider('http://localhost:8545')); // 8080 for cpp/AZ, 8545 for go/mist
```

***

#### vnt.currentProvider
     vnt.currentProvider
 Will contain the current provider, if one is set. This can be used to check if mist etc. has set already a provider.

##### Returns

 `Object` - The provider set or `null`;

##### Example

 ```js
// Check if mist etc. already set a provider
if(!vnt.currentProvider)
    vnt.setProvider(new vnt.providers.HttpProvider("http://localhost:8545"));
 ```

***

#### vnt.reset

     vnt.reset(keepIsSyncing)
 Should be called to reset state of vnt. Resets everything except manager. Uninstalls all filters. Stops polling.

#### Parameters

 1. `Boolean` - If `true` it will uninstall all filters, but will keep the [vnt.core.isSyncing()](#vntcoreissyncing) polls

##### Returns

 `undefined`

##### Example

 ```js
vnt.reset();
```

***

#### vnt.sha3

     vnt.sha3(string [, options])

#### Parameters

 1. `String` - The string to hash using the Keccak-256 SHA3 algorithm
1. `Object` - (optional) Set `encoding` to `hex` if the string to hash is encoded in hex. A leading `0x` will be automatically ignored.

##### Returns

 `String` - The Keccak-256 SHA3 of the given data.

##### Example

 ```js
var hash = vnt.sha3("Some string to be hashed");
console.log(hash); // "0xed973b234cf2238052c9ac87072c71bcf33abc1bbd721018e0cca448ef79b379"
 var hashOfHash = vnt.sha3(hash, {encoding: 'hex'});
console.log(hashOfHash); // "0x85dd39c91a64167ba20732b228251e67caed1462d4bcf036af88dc6856d0fdcc"
```

***

#### vnt.toHex

     vnt.toHex(mixed);

Converts any value into HEX.

#### Parameters

 1. `String|Number|Object|Array|BigNumber` - The value to parse to HEX. If its an object or array it will be `JSON.stringify` first. If its a BigNumber it will make it the HEX value of a number.

##### Returns

 `String` - The hex string of `mixed`.

##### Example

 ```js
var str = vnt.toHex({test: 'test'});
console.log(str); // '0x7b2274657374223a2274657374227d'
```

***

#### vnt.toAscii

     vnt.toAscii(hexString);
 Converts a HEX string into a ASCII string.

#### Parameters

 1. `String` - A HEX string to be converted to ascii.

##### Returns

 `String` - An ASCII string made from the given `hexString`.

##### Example

 ```js
var str = vnt.toAscii("0x766e74636861696e000000000000000000000000000000000000000000000000");
console.log(str); // "vntchain"
```

***

#### vnt.fromAscii

     vnt.fromAscii(string);
 Converts any ASCII string to a HEX string.

#### Parameters

 1. `String` - An ASCII string to be converted to HEX.

##### Returns

 `String` - The converted HEX string.

##### Example

 ```js
var str = vnt.fromAscii('vntchain');
console.log(str); // "0x766e74636861696e"
```

***

#### vnt.toDecimal
     vnt.toDecimal(hexString);
 Converts a HEX string to its number representation.

#### Parameters
 1. `String` - A HEX string to be converted to a number.

##### Returns

 `Number` - The number representing the data `hexString`.

##### Example

 ```js
var number = vnt.toDecimal('0x15');
console.log(number); // 21
```

***

#### vnt.fromDecimal
     vnt.fromDecimal(number);
 Converts a number or number string to its HEX representation.

#### Parameters
 1. `Number|String` - A number to be converted to a HEX string.

##### Returns

 `String` - The HEX string representing of the given `number`.

##### Example

 ```js
var value = vnt.fromDecimal('21');
console.log(value); // "0x15"
```

***

#### vnt.fromWei
     vnt.fromWei(number, unit)
 Converts a number of wei into the following vntchain units:
 - `wei`
 - `kwei`/`Kwei`
 - `mwei`/`Mwei`
 - `gwei`/`Gwei`
 - `microvnt`/`micro`
 - `millivnt`/`milli`
 - `vnt`

#### Parameters
1. `Number|String|BigNumber` - A number or BigNumber instance.
2. `String` - One of the above vnt units.

##### Returns

 `String|BigNumber` - Either a number string, or a BigNumber instance, depending on the given `number` parameter.

##### Example

 ```js
var value = vnt.fromWei('21000000000000', 'finney');
console.log(value); // "0.021"
```

***

#### vnt.toWei
     vnt.toWei(number, unit)
 Converts an vntchain unit into wei. Possible units are:
 - `kwei`/`Kwei`
 - `mwei`/`Mwei`
 - `gwei`/`Gwei`
 - `microvnt`/`micro`
 - `millivnt`/`milli`
 - `vnt`

#### Parameters
 1. `Number|String|BigNumber` - A number or BigNumber instance.
2. `String` - One of the above vnt units.

##### Returns

 `String|BigNumber` - Either a number string, or a BigNumber instance, depending on the given `number` parameter.

##### Example

 ```js
var value = vnt.toWei('1', 'vnt');
console.log(value); // "1000000000000000000"
```

***

#### vnt.toBigNumber
     vnt.toBigNumber(numberOrHexString);
 Converts a given number into a BigNumber instance.
 See the [note on BigNumber](#a-note-on-big-numbers-in-vntjs).

#### Parameters
 1. `Number|String` - A number, number string or HEX string of a number.

##### Returns

 `BigNumber` - A BigNumber instance representing the given value.

##### Example

 ```js
var value = vnt.toBigNumber('200000000000000000000001');
console.log(value); // instanceOf BigNumber
console.log(value.toNumber()); // 2.0000000000000002e+23
console.log(value.toString(10)); // '200000000000000000000001'
```

***

#### vnt.isAddress
     vnt.isAddress(HexString);
 Checks if the given string is an address.

#### Parameters

 1. `String` - A HEX string.

##### Returns

 `Boolean` - `false` if it's not on a valid address format. Returns `true` if it's an all lowercase or all uppercase valid address. If it's a mixed case address, it checks using `vnt.isChecksumAddress()`.

##### Example

 ```js
var isAddress = vnt.isAddress("0x8888f1f195afa192cfee860698584c030f4c9db1");
console.log(isAddress); // true
```

***


### vnt.net

#### vnt.net.listening

     vnt.net.listening
    // or async
    vnt.net.getListening(callback(error, result){ ... })
 This property is read only and says whether the node is actively listening for network connections or not.

##### Returns

 `Boolean` - `true` if the client is actively listening for network connections, otherwise `false`.

##### Example

 ```js
var listening = vnt.net.listening;
console.log(listening); // true of false
```

***

#### vnt.net.peerCount
     vnt.net.peerCount
    // or async
    vnt.net.getPeerCount(callback(error, result){ ... })
 This property is read only and returns the number of connected peers.

##### Returns

 `Number` - The number of peers currently connected to the client.

##### Example

 ```js
var peerCount = vnt.net.peerCount;
console.log(peerCount); // 4
```

***

### vnt.core
 Contains the vntchain blockchain related methods.

##### Example

 ```js
var core = vnt.core;
```

***

#### vnt.core.defaultAccount
     vnt.core.defaultAccount
 This default address is used for the following methods (optionally you can overwrite it by specifying the `from` property):
 - [vnt.core.sendTransaction()](#vntcoresendtransaction)
- [vnt.core.call()](#vntcorecall)

##### Values

 `String`, 20 Bytes - Any address you own, or where you have the private key for.
 *Default is* `undefined`.

##### Returns

 `String`, 20 Bytes - The currently set default address.

##### Example

 ```js
var defaultAccount = vnt.core.defaultAccount;
console.log(defaultAccount); // ''
 // set the default account
vnt.core.defaultAccount = '0x8888f1f195afa192cfee860698584c030f4c9db1';
```

***

#### vnt.core.defaultBlock
    vnt.core.defaultBlock
This default block is used for the following methods (optionally you can override it by passing the defaultBlock parameter):
- [vnt.core.getBalance()](#vntcoregetbalance)
- [vnt.core.getCode()](#vntcoregetcode)
- [vnt.core.getTransactionCount()](#vntcoregettransactioncount)
- [vnt.core.getStorageAt()](#vntcoregetstorageat)
- [vnt.core.call()](#vntcorecall)
- [contract.myMethod.call()](#contract-methods)
- [contract.myMethod.estimateGas()](#contract-methods)
- [contract.codeFile()](#contract-codefile)
- [contract.packContructorData()](#contract-packcontructordata)
- [contract.packFunctionData()](#contract-packfunctiondata)
- [contract.unPackOutput()](#contract-unpackoutput)

##### Values
Default block parameters can be one of the following:
- `Number` - a block number
- `String` - `"earliest"`, the genesis block
- `String` - `"latest"`, the latest block (current head of the blockchain)
- `String` - `"pending"`, the currently mined block (including pending transactions)
*Default is* `latest`

##### Returns
`Number|String` - The default block number to use when querying a state.

##### Example

```js
var defaultBlock = vnt.core.defaultBlock;
console.log(defaultBlock); // 'latest'
// set the default block
vnt.core.defaultBlock = 231;
```

***

#### vnt.core.syncing
    vnt.core.syncing
   // or async
   vnt.core.getSyncing(callback(error, result){ ... })
This property is read only and returns the either a sync object, when the node is syncing or `false`.

##### Returns
`Object|Boolean` - A sync object as follows, when the node is currently syncing or `false`:
  - `startingBlock`: `Number` - The block number where the sync started.
  - `currentBlock`: `Number` - The block number where at which block the node currently synced to already.
  - `highestBlock`: `Number` - The estimated block number to sync to.

##### Example

```js
var sync = vnt.core.syncing;
console.log(sync);
/*
{
  startingBlock: 300,
  currentBlock: 312,
  highestBlock: 512
}
*/
```

***

#### vnt.core.isSyncing
    vnt.core.isSyncing(callback);
This convenience function calls the `callback` everytime a sync starts, updates and stops.

##### Returns
`Object` - a isSyncing object with the following methods:
  * `syncing.addCallback()`: Adds another callback, which will be called when the node starts or stops syncing.
 * `syncing.stopWatching()`: Stops the syncing callbacks.

##### Callback return value
- `Boolean` - The callback will be fired with `true` when the syncing starts and with `false` when it stopped.
- `Object` - While syncing it will return the syncing object:
  - `startingBlock`: `Number` - The block number where the sync started.
  - `currentBlock`: `Number` - The block number where at which block the node currently synced to already.
  - `highestBlock`: `Number` - The estimated block number to sync to.

##### Example

```js
vnt.core.isSyncing(function(error, sync){
   if(!error) {
       // stop all app activity
       if(sync === true) {
          // we use `true`, so it stops all filters, but not the vnt.core.syncing polling
          vnt.reset(true);

       // show sync info
       } else if(sync) {
          console.log(sync.currentBlock);

       // re-gain app operation
       } else {
           // run your app init function...
       }
   }
});
```

***

#### vnt.core.coinbase
    vnt.core.coinbase
   // or async
   vnt.core.getCoinbase(callback(error, result){ ... })
This property is read only and returns the coinbase address where the block rewards go to.

##### Returns
`String` - The coinbase address of the client.

##### Example

```js
var coinbase = vnt.core.coinbase;
console.log(coinbase); // "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
```

***

#### vnt.core.producing
    vnt.core.produxing
   // or async
   vnt.core.getProducing(callback(error, result){ ... })
This property is read only and says whether the node is producing blocks or not.

##### Returns
`Boolean` - `true` if the client is produsing, otherwise `false`.

##### Example
```js
var producing = vnt.core.producing;
console.log(producing); // true or false
```

***

#### vnt.core.gasPrice
    vnt.core.gasPrice
   // or async
   vnt.core.getGasPrice(callback(error, result){ ... })
This property is read only and returns the current gas price.
The gas price is determined by the x latest blocks median gas price.

##### Returns
`BigNumber` - A BigNumber instance of the current gas price in wei.
See the [note on BigNumber](#a-note-on-big-numbers-in-vntjs).

##### Example
```js
var gasPrice = vnt.core.gasPrice;
console.log(gasPrice.toString(10)); // "10000000000000"
```

***

#### vnt.core.accounts
    vnt.core.accounts
   // or async
   vnt.core.getAccounts(callback(error, result){ ... })
This property is read only and returns a list of accounts the node controls.

##### Returns
`Array` - An array of addresses controlled by client.

##### Example
```js
var accounts = vnt.core.accounts;
console.log(accounts); // ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
```

***

#### vnt.core.blockNumber
    vnt.core.blockNumber
   // or async
   vnt.core.getBlockNumber(callback(error, result){ ... })
This property is read only and returns the current block number.

##### Returns
`Number` - The number of the most recent block.

##### Example
```js
var number = vnt.core.blockNumber;
console.log(number); // 2744
```

***

#### vnt.core.getBalance
    vnt.core.getBalance(addressHexString [, defaultBlock] [, callback])
Get the balance of an address at a given block.

##### Parameters
1. `String` - The address to get the balance of.
2. `Number|String` - (optional) If you pass this parameter it will not use the default block set with [vnt.core.defaultBlock](#vntcoredefaultblock).
3. `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](#using-callbacks) for details.

##### Returns
`String` - A BigNumber instance of the current balance for the given address in wei.
See the [note on BigNumber](#a-note-on-big-numbers-in-vntjs).

##### Example
```js
var balance = vnt.core.getBalance("0x407d73d8a49eeb85d32cf465507dd71d507100c1");
console.log(balance); // instanceof BigNumber
console.log(balance.toString(10)); // '1000000000000'
console.log(balance.toNumber()); // 1000000000000
```

***

#### vnt.core.getStorageAt
    vnt.core.getStorageAt(addressHexString, position [, defaultBlock] [, callback])
Get the storage at a specific position of an address.

##### Parameters
1. `String` - The address to get the storage from.
2. `Number` - The index position of the storage.
3. `Number|String` - (optional) If you pass this parameter it will not use the default block set with [vnt.core.defaultBlock](#vntcoredefaultblock).
4. `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](#using-callbacks) for details.

##### Returns
`String` - The value in storage at the given position.

##### Example
```js
var state = vnt.core.getStorageAt("0x407d73d8a49eeb85d32cf465507dd71d507100c1", 0);
console.log(state); // "0x03"
```

***

#### vnt.core.getCode
    vnt.core.getCode(addressHexString [, defaultBlock] [, callback])
Get the code at a specific address.

##### Parameters
1. `String` - The address to get the code from.
2. `Number|String` - (optional) If you pass this parameter it will not use the default block set with [vnt.core.defaultBlock](#vntcoredefaultblock).
3. `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](#using-callbacks) for details.

##### Returns
`String` - The data at given address `addressHexString`.

##### Example
```js
var code = vnt.core.getCode("0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8");
console.log(code); // "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
```

***

#### vnt.core.getBlock
     vnt.core.getBlock(blockHashOrBlockNumber [, returnTransactionObjects] [, callback])
Returns a block matching the block number or block hash.

##### Parameters
1. `String|Number` - The block number or hash. Or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](#vntcoredefaultblock).
2. `Boolean` - (optional, default `false`) If `true`, the returned block will contain all transactions as objects, if `false` it will only contains the transaction hashes.
3. `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](#using-callbacks) for details.

##### Returns
`Object` - The block object:
  - `number`: `Number` - the block number. `null` when its pending block.
 - `hash`: `String`, 32 Bytes - hash of the block. `null` when its pending block.
 - `parentHash`: `String`, 32 Bytes - hash of the parent block.
 - `nonce`: `String`, 8 Bytes - hash of the generated proof-of-work. `null` when its pending block.
 - `logsBloom`: `String`, 256 Bytes - the bloom filter for the logs of the block. `null` when its pending block.
 - `transactionsRoot`: `String`, 32 Bytes - the root of the transaction trie of the block
 - `stateRoot`: `String`, 32 Bytes - the root of the final state trie of the block.
 - `difficulty`: `BigNumber` - integer of the difficulty for this block.
 - `totalDifficulty`: `BigNumber` - integer of the total difficulty of the chain until this block.
 - `extraData`: `String` - the "extra data" field of this block.
 - `size`: `Number` - integer the size of this block in bytes.
 - `gasLimit`: `Number` - the maximum gas allowed in this block.
 - `gasUsed`: `Number` - the total used gas by all transactions in this block.
 - `timestamp`: `Number` - the unix timestamp for when the block was collated.
 - `transactions`: `Array` - Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter.

##### Example
```js
var info = vnt.core.getBlock(3150);
console.log(info);
/*
{
 "number": 3,
 "hash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
 "parentHash": "0x2302e1c0b972d00932deb5dab9eb2982f570597d9d42504c05d9c2147eaf9c88",
 "nonce": "0xfb6e1a62d119228b",
 "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
 "transactionsRoot": "0x3a1b03875115b79539e5bd33fb00d8f7b7cd61929d5a3c574f507b8acf415bee",
 "stateRoot": "0xf1133199d44695dfa8fd1bcfe424d82854b5cebef75bddd7e40ea94cda515bcb",
 "difficulty": BigNumber,
 "totalDifficulty": BigNumber,
 "size": 616,
 "extraData": "0x",
 "gasLimit": 3141592,
 "gasUsed": 21662,
 "timestamp": 1429287689,
 "transactions": [
   "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b"
 ]
}
*/
```

***

#### vnt.core.getBlockTransactionCount
    vnt.core.getBlockTransactionCount(hashStringOrBlockNumber [, callback])
Returns the number of transaction in a given block.

##### Parameters
1. `String|Number` - The block number or hash. Or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](#vntcoredefaultblock).
2. `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](#using-callbacks) for details.

##### Returns
`Number` - The number of transactions in the given block.

##### Example
```js
var number = vnt.core.getBlockTransactionCount("0x407d73d8a49eeb85d32cf465507dd71d507100c1");
console.log(number); // 1
```

##### vnt.core.getTransaction
    vnt.core.getTransaction(transactionHash [, callback])
Returns a transaction matching the given transaction hash.

##### Parameters
1. `String` - The transaction hash.
2. `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](#using-callbacks) for details.

##### Returns
`Object` - A transaction object its hash `transactionHash`:
  - `hash`: `String`, 32 Bytes - hash of the transaction.
 - `nonce`: `Number` - the number of transactions made by the sender prior to this one.
 - `blockHash`: `String`, 32 Bytes - hash of the block where this transaction was in. `null` when its pending.
 - `blockNumber`: `Number` - block number where this transaction was in. `null` when its pending.
 - `transactionIndex`: `Number` - integer of the transactions index position in the block. `null` when its pending.
 - `from`: `String`, 20 Bytes - address of the sender.
 - `to`: `String`, 20 Bytes - address of the receiver. `null` when its a contract creation transaction.
 - `value`: `BigNumber` - value transferred in Wei.
 - `gasPrice`: `BigNumber` - gas price provided by the sender in Wei.
 - `gas`: `Number` - gas provided by the sender.
 - `input`: `String` - the data sent along with the transaction.

##### Example
```js
var transaction = vnt.core.getTransaction('0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b');
console.log(transaction);
/*
{
 "hash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
 "nonce": 2,
 "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
 "blockNumber": 3,
 "transactionIndex": 0,
 "from": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
 "to": "0x6295ee1b4f6dd65047762f924ecd367c17eabf8f",
 "value": BigNumber,
 "gas": 314159,
 "gasPrice": BigNumber,
 "input": "0x57cb2fc4"
}
*/
```

***

#### vnt.core.getTransactionFromBlock
    getTransactionFromBlock(hashStringOrNumber, indexNumber [, callback])
Returns a transaction based on a block hash or number and the transactions index position.

##### Parameters
1. `String` - A block number or hash. Or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](#vntcoredefaultblock).
2. `Number` - The transactions index position.
3. `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](#using-callbacks) for details.

##### Returns
`Object` - A transaction object, see [vnt.core.getTransaction](#vntcoregettransaction):
##### Example
```js
var transaction = vnt.core.getTransactionFromBlock('0x4534534534', 2);
console.log(transaction); // see vnt.core.getTransaction
```

***

#### vnt.core.getTransactionReceipt
    vnt.core.getTransactionReceipt(hashString [, callback])
Returns the receipt of a transaction by transaction hash.
**Note** That the receipt is not available for pending transactions.

##### Parameters
1. `String` - The transaction hash.
2. `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](#using-callbacks) for details.

##### Returns
`Object` - A transaction receipt object, or `null` when no receipt was found:
  - `blockHash`: `String`, 32 Bytes - hash of the block where this transaction was in.
 - `blockNumber`: `Number` - block number where this transaction was in.
 - `transactionHash`: `String`, 32 Bytes - hash of the transaction.
 - `transactionIndex`: `Number` - integer of the transactions index position in the block.
 - `from`: `String`, 20 Bytes - address of the sender.
 - `to`: `String`, 20 Bytes - address of the receiver. `null` when its a contract creation transaction.
 - `cumulativeGasUsed `: `Number ` - The total amount of gas used when this transaction was executed in the block.
 - `gasUsed `: `Number ` -  The amount of gas used by this specific transaction alone.
 - `contractAddress `: `String` - 20 Bytes - The contract address created, if the transaction was a contract creation, otherwise `null`.
 - `logs `:  `Array` - Array of log objects, which this transaction generated.
 - `status `:  `String` - '0x0' indicates transaction failure , '0x1' indicates transaction succeeded.

##### Example
```js
var receipt = vnt.core.getTransactionReceipt('0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b');
console.log(receipt);
{
 "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
 "transactionIndex": 0,
 "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
 "blockNumber": 3,
 "contractAddress": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
 "cumulativeGasUsed": 314159,
 "gasUsed": 30234,
 "logs": [{
        // logs as returned by getFilterLogs, etc.
    }, ...],
 "status": "0x1"
}
```

***

#### vnt.core.getTransactionCount
    vnt.core.getTransactionCount(addressHexString [, defaultBlock] [, callback])
Get the numbers of transactions sent from this address.

##### Parameters
1. `String` - The address to get the numbers of transactions from.
2. `Number|String` - (optional) If you pass this parameter it will not use the default block set with [vnt.core.defaultBlock](#vntcoredefaultblock).
3. `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](#using-callbacks) for details.

##### Returns
`Number` - The number of transactions sent from the given address.

##### Example
```js
var number = vnt.core.getTransactionCount("0x407d73d8a49eeb85d32cf465507dd71d507100c1");
console.log(number); // 1
```

***

#### vnt.core.sendTransaction
    vnt.core.sendTransaction(transactionObject [, callback])
Sends a transaction to the network.

##### Parameters
1. `Object` - The transaction object to send:
 - `from`: `String` - The address for the sending account. Uses the [vnt.core.defaultAccount](#vntcoredefaultaccount) property, if not specified.
 - `to`: `String` - (optional) The destination address of the message, left undefined for a contract-creation transaction.
 - `value`: `Number|String|BigNumber` - (optional) The value transferred for the transaction in Wei, also the endowment if it's a contract-creation transaction.
 - `gas`: `Number|String|BigNumber` - (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
 - `gasPrice`: `Number|String|BigNumber` - (optional, default: To-Be-Determined) The price of gas for this transaction in wei, defaults to the mean network gas price.
 - `data`: `String` - (optional) Either a byte string containing the associated data of the message, or in the case of a contract-creation transaction, the initialisation code.
 - `nonce`: `Number`  - (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.
2. `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](#using-callbacks) for details.

##### Returns
`String` - The 32 Bytes transaction hash as HEX string.
If the transaction was a contract creation use [vnt.core.getTransactionReceipt()](#vntcoregettransactionreceipt) to get the contract address, after the transaction was mined.

##### Example
```js
var code = "603d80600c6000396000f3007c01000000000000000000000000000000000000000000000000000000006000350463c6888fa18114602d57005b6007600435028060005260206000f3";
vnt.core.sendTransaction({data: code}, function(err, transactionHash) {
 if (!err)
   console.log(transactionHash); // "0x7f9fade1c0d57a7af66ab4ead7c2eb7b11a91385"
});
```

***

#### vnt.core.sendRawTransaction
    vnt.core.sendRawTransaction(signedTransactionData [, callback])
Sends an already signed transaction. For example can be signed using: https://github.com/SilentCicero/ethereumjs-accounts
##### Parameters
1. `String` - Signed transaction data in HEX format
2. `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](#using-callbacks) for details.

##### Returns
`String` - The 32 Bytes transaction hash as HEX string.
If the transaction was a contract creation use [vnt.core.getTransactionReceipt()](#vntcoregettransactionreceipt) to get the contract address, after the transaction was mined.

##### Example
```js
var Tx = require('ethereumjs-tx');
var privateKey = new Buffer('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex')
var rawTx = {
 nonce: '0x00',
 gasPrice: '0x09184e72a000',
 gasLimit: '0x2710',
 to: '0x0000000000000000000000000000000000000000',
 value: '0x00',
 data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
}
var tx = new Tx(rawTx);
tx.sign(privateKey);
var serializedTx = tx.serialize();
//console.log(serializedTx.toString('hex'));
//f889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f
vnt.core.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
 if (!err)
   console.log(hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
});
```

***

#### vnt.core.sign
    vnt.core.sign(address, dataToSign, [, callback])
Signs data from a specific account. This account needs to be unlocked.

##### Parameters
1. `String` - Address to sign with.
2. `String` - Data to sign.
3. `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](#using-callbacks) for details.

##### Returns
`String` - The signed data.
After the hex prefix, characters correspond to ECDSA values like this:
```
r = signature[0:64]
s = signature[64:128]
v = signature[128:130]
```
Note that if you are using `ecrecover`, `v` will be either `"00"` or `"01"`. As a result, in order to use this value, you will have to parse it to an integer and then add `27`. This will result in either a `27` or a `28`.

##### Example
```js
var result = vnt.core.sign("0x135a7de83802408321b74c322f8558db1679ac20",
   "0x9dd2c369a187b4e6b9c402f030e50743e619301ea62aa4c0737d4ef7e10a3d49"); // second argument is vnt.sha3("xyz")
console.log(result); // "0x30755ed65396facf86c53e6217c52b4daebe72aa4941d89635409de4c9c7f9466d4e9aaec7977f05e923889b33c0d0dd27d7226b6e6f56ce737465c5cfd04be400"
```

***

#### vnt.core.call
    vnt.core.call(callObject [, defaultBlock] [, callback])
Executes a message call transaction, which is directly executed in the VM of the node, but never mined into the blockchain.

##### Parameters
1. `Object` - A transaction object see [vnt.core.sendTransaction](#vntcoresendtransaction), with the difference that for calls the `from` property is optional as well.
2. `Number|String` - (optional) If you pass this parameter it will not use the default block set with [vnt.core.defaultBlock](#vntcoredefaultblock).
3. `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](#using-callbacks) for details.

##### Returns
`String` - The returned data of the call, e.g. a codes functions return value.

##### Example
```js
var result = vnt.core.call({
   to: "0xc4abd0339eb8d57087278718986382264244252f",
   data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
});
console.log(result); // "0x0000000000000000000000000000000000000000000000000000000000000015"
```

***

#### vnt.core.estimateGas
    vnt.core.estimateGas(callObject [, callback])
Executes a message call or transaction, which is directly executed in the VM of the node, but never mined into the blockchain and returns the amount of the gas used.

##### Parameters
See [vnt.core.sendTransaction](#vntcoresendtransaction), except that all properties are optional.

##### Returns
`Number` - the used gas for the simulated call/transaction.

##### Example
```js
var result = vnt.core.estimateGas({
   to: "0xc4abd0339eb8d57087278718986382264244252f",
   data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
});
console.log(result); // "0x0000000000000000000000000000000000000000000000000000000000000015"
```

***

#### vnt.core.filter
```js
// can be 'latest' or 'pending'
var filter = vnt.core.filter(filterString);
// OR object are log filter options
var filter = vnt.core.filter(options);
// watch for changes
filter.watch(function(error, result){
 if (!error)
   console.log(result);
});
// Additionally you can start watching right away, by passing a callback:
vnt.core.filter(options, function(error, result){
 if (!error)
   console.log(result);
});
```

##### Parameters
1. `String|Object` - The string `"latest"` or `"pending"` to watch for changes in the latest block or pending transactions respectively. Or a filter options object as follows:
 * `fromBlock`: `Number|String` - The number of the earliest block (`latest` may be given to mean the most recent and `pending` currently producing, block). By default `latest`.
 * `toBlock`: `Number|String` - The number of the latest block (`latest` may be given to mean the most recent and `pending` currently producing, block). By default `latest`.
 * `address`: `String` - An address ~or a list of addresses~ to only get logs from particular account(s).
 * `topics`: `Array of Strings` - An array of values which must each appear in the log entries. The order is important, if you want to leave topics out use `null`, e.g. `[null, '0x00...']`. You can also pass another array for each topic with options for that topic e.g. `[null, ['option1', 'option2']]`

##### Returns
`Object` - A filter object with the following methods:
  * `filter.get(callback)`: Returns all of the log entries that fit the filter.
 * `filter.watch(callback)`: Watches for state changes that fit the filter and calls the callback. See [this note](#using-callbacks) for details.
 * `filter.stopWatching()`: Stops the watch and uninstalls the filter in the node. Should always be called once it is done.

##### Watch callback return value
- `String` - When using the `"latest"` parameter, it returns the block hash of the last incoming block.
- `String` - When using the `"pending"` parameter, it returns a transaction hash of the most recent pending transaction.
- `Object` - When using manual filter options, it returns a log object as follows:
   - `logIndex`: `Number` - integer of the log index position in the block. `null` when its pending log.
   - `transactionIndex`: `Number` - integer of the transactions index position log was created from. `null` when its pending log.
   - `transactionHash`: `String`, 32 Bytes - hash of the transactions this log was created from. `null` when its pending log.
   - `blockHash`: `String`, 32 Bytes - hash of the block where this log was in. `null` when its pending. `null` when its pending log.
   - `blockNumber`: `Number` - the block number where this log was in. `null` when its pending. `null` when its pending log.
   - `address`: `String`, 32 Bytes - address from which this log originated.
   - `data`: `String` - contains one or more 32 Bytes non-indexed arguments of the log.
   - `topics`: `Array of Strings` - Array of 0 to 4 32 Bytes `DATA` of indexed log arguments. (The first topic is the *hash* of the signature of the event (e.g. `Deposit(address,bytes32,uint256)`), except if you declared the event with the `anonymous` specifier.)
   - `type`: `STRING` - `pending` when the log is pending. `mined` if log is already mined.
**Note** For event filter return values see [Contract Events](#contract-events)

##### Example
```js
var filter = vnt.core.filter({toBlock:'pending'});
filter.watch(function (error, log) {
 console.log(log); //  {"address":"0x0000000000000000000000000000000000000000", "data":"0x0000000000000000000000000000000000000000000000000000000000000000", ...}
});
// get all past logs again.
var myResults = filter.get(function(error, logs){ ... });
...
// stops and uninstalls the filter
filter.stopWatching();
```

***

#### vnt.core.contract
    vnt.core.contract(abiArray)
Creates a contract object for a wasm contract, which can be used to initiate contracts on an address.

##### Parameters
1. `Array` - ABI array with descriptions of functions and events of the contract.

##### Returns
`Object` - A contract object, which can be initiated as follows:
```js
var MyContract = vnt.core.contract(abiArray);
// instantiate by address
var contractInstance = MyContract.at(address);
// deploy new contract
var contractInstance = MyContract.new([constructorParam1] [, constructorParam2], {data: '0x12345...', from: myAccount, gas: 1000000});
// Get the data to deploy the contract manually
var contractData = MyContract.new.getData([constructorParam1] [, constructorParam2], {data: '0x12345...'});
// contractData = '0x12345643213456000000000023434234'
```
And then you can either initiate an existing contract on an address,
or deploy the contract using the compiled wasm byte code:
```js
// Instantiate from an existing address:
var myContractInstance = MyContract.at(myContractAddress);
// Or deploy a new contract:
...
const fs = require("fs");
let codeFile = "dir/of/wasm/code/file"
let abiFile = "dir/of/abi"

let abi = fs.readFileSync(abiFile)

let MyContract = vnt.core.contract(JSON.parse(abi)).codeFile(codeFile);

let data = MyContract.packContructorData(param1, param2);
let gasEstimate = vnt.core.estimateGas({data: data});

var myContractReturned = MyContract.new(param1, param2, {
  from:mySenderAddress,
  data:MyContract.code,
  gas:gasEstimate}, function(err, myContract){
   if(!err) {
      // NOTE: The callback will fire twice!
      // Once the contract has the transactionHash property set and once its deployed on an address.
       // e.g. check tx hash on the first call (transaction send)
      if(!myContract.address) {
          console.log(myContract.transactionHash) // The hash of the transaction, which deploys the contract

      // check address on the second call (contract deployed)
      } else {
          console.log(myContract.address) // the contract address
      }
       // Note that the returned "myContractReturned" === "myContract",
      // so the returned "myContractReturned" object will also get the address set.
   }
 });
// Deploy contract syncronous: The address will be added as soon as the contract is mined.
// Additionally you can watch the transaction by using the "transactionHash" property
var myContractInstance = MyContract.new(param1, param2, {data: data, gas: 300000, from: mySenderAddress});
myContractInstance.transactionHash // The hash of the transaction, which created the contract
myContractInstance.address // undefined at start, but will be auto-filled later
```

##### Example
```js
// contract abi
var abi = [{
    name: 'myConstantMethod',
    type: 'function',
    constant: true,
    inputs: [{ name: 'a', type: 'string' }],
    outputs: [{name: 'd', type: 'string' }]
}, {
    name: 'myStateChangingMethod',
    type: 'function',
    constant: false,
    inputs: [{ name: 'a', type: 'string' }, { name: 'b', type: 'int' }],
    outputs: []
}, {
    name: 'myEvent',
    type: 'event',
    inputs: [{name: 'a', type: 'int', indexed: true},{name: 'b', type: 'bool', indexed: false}]
}];
// creation of contract object
var MyContract = vnt.core.contract(abi);
// initiate contract for an address
var myContractInstance = MyContract.at('0xc4abd0339eb8d57087278718986382264244252f');
// call constant function
var result = myContractInstance.myConstantMethod('myParam');
console.log(result) // '0x25434534534'
// send a transaction to a function
myContractInstance.myStateChangingMethod('someParam1', 23, {value: 200, gas: 2000});
// short hand style
vnt.core.contract(abi).at(address).myAwesomeMethod(...);
// create filter
var filter = myContractInstance.myEvent({a: 5}, function (error, result) {
 if (!error)
   console.log(result);
   /*
   {
       address: '0x8718986382264244252fc4abd0339eb8d5708727',
       topics: "0x12345678901234567890123456789012", "0x0000000000000000000000000000000000000000000000000000000000000005",
       data: "0x0000000000000000000000000000000000000000000000000000000000000001",
       ...
   }
   */
});
```

***

#### Contract Methods
```js
// Automatically determines the use of call or sendTransaction based on the method type
myContractInstance.myMethod(param1 [, param2, ...] [, transactionObject] [, defaultBlock] [, callback]);
// Explicitly calling this method
myContractInstance.myMethod.call(param1 [, param2, ...] [, transactionObject] [, defaultBlock] [, callback]);
// Explicitly sending a transaction to this method
myContractInstance.myMethod.sendTransaction(param1 [, param2, ...] [, transactionObject] [, callback]);
// Get the call data, so you can call the contract through some other means
// var myCallData = myContractInstance.myMethod.request(param1 [, param2, ...]);
var myCallData = myContractInstance.myMethod.getData(param1 [, param2, ...]);
// myCallData = '0x45ff3ff6000000000004545345345345..'
```
The contract object exposes the contract's methods, which can be called using parameters and a transaction object.

##### Parameters
- `String|Number|BigNumber` - (optional) Zero or more parameters of the function. If passing in a string, it must be formatted as a hex number, e.g. "0xdeadbeef" If you have already created BigNumber object, then you can just pass it too.
- `Object` - (optional) The (previous) last parameter can be a transaction object, see [vnt.core.sendTransaction](#vntcoresendtransaction) parameter 1 for more. **Note**: `data` and `to` properties will not be taken into account.
- `Number|String` - (optional) If you pass this parameter it will not use the default block set with [vnt.core.defaultBlock](#vntcoredefaultblock).
- `Function` - (optional) If you pass a callback as the last parameter the HTTP request is made asynchronous. See [this note](#using-callbacks) for details.

##### Returns
`String` - If its a call the result data, if its a send transaction a created contract address, or the transaction hash, see [vnt.core.sendTransaction](#vntcoresendtransaction) for details.

##### Example
```js
// creation of contract object
var MyContract = vnt.core.contract(abi);
// initiate contract for an address
var myContractInstance = MyContract.at('0x78e97bcc5b5dd9ed228fed7a4887c0d7287344a9');
var result = myContractInstance.myConstantMethod('myParam');
console.log(result) // '0x25434534534'
myContractInstance.myStateChangingMethod('someParam1', 23, {value: 200, gas: 2000}, function(err, result){ ... });
```

***

#### Contract Events
```js
var event = myContractInstance.myEvent({valueA: 23} [, additionalFilterObject])
// watch for changes
event.watch(function(error, result){
 if (!error)
   console.log(result);
});
// Or pass a callback to start watching immediately
var event = myContractInstance.myEvent([{valueA: 23}] [, additionalFilterObject] , function(error, result){
 if (!error)
   console.log(result);
});
```
You can use events like [filters](#vntcorefilter) and they have the same methods, but you pass different objects to create the event filter.

##### Parameters
1. `Object` - Indexed return values you want to filter the logs by, e.g. `{'valueA': 1, 'valueB': [myFirstAddress, mySecondAddress]}`. By default all filter values are set to `null`. It means, that they will match any event of given type sent from this contract.
2. `Object` - Additional filter options, see [filters](#vntcorefilter) parameter 1 for more. By default filterObject has field 'address' set to address of the contract. Also first topic is the signature of event.
3. `Function` - (optional) If you pass a callback as the last parameter it will immediately start watching and you don't need to call `myEvent.watch(function(){})`. See [this note](#using-callbacks) for details.

##### Callback return
`Object` - An event object as follows:
- `address`: `String`, 32 Bytes - address from which this log originated.
- `args`: `Object` - The arguments coming from the event.
- `blockHash`: `String`, 32 Bytes - hash of the block where this log was in. `null` when its pending.
- `blockNumber`: `Number` - the block number where this log was in. `null` when its pending.
- `logIndex`: `Number` - integer of the log index position in the block.
- `event`: `String` - The event name.
- `removed`: `bool` -  indicate if the transaction this event was created from was removed from the blockchain (due to orphaned block) or never get to it (due to rejected transaction).
- `transactionIndex`: `Number` - integer of the transactions index position log was created from.
- `transactionHash`: `String`, 32 Bytes - hash of the transactions this log was created from.

##### Example
```js
var MyContract = vnt.core.contract(abi);
var myContractInstance = MyContract.at('0x78e97bcc5b5dd9ed228fed7a4887c0d7287344a9');
// watch for an event with {some: 'args'}
var myEvent = myContractInstance.myEvent({some: 'args'}, {fromBlock: 0, toBlock: 'latest'});
myEvent.watch(function(error, result){
  ...
});
// would get all past logs again.
var myResults = myEvent.get(function(error, logs){ ... });
...
// would stop and uninstall the filter
myEvent.stopWatching();
```

***

#### Contract allEvents
```js
var events = myContractInstance.allEvents([additionalFilterObject]);
// watch for changes
events.watch(function(error, event){
 if (!error)
   console.log(event);
});
// Or pass a callback to start watching immediately
var events = myContractInstance.allEvents([additionalFilterObject], function(error, log){
 if (!error)
   console.log(log);
});
```
Will call the callback for all events which are created by this contract.

##### Parameters
1. `Object` - Additional filter options, see [filters](#vntcorefilter) parameter 1 for more. By default filterObject has field 'address' set to address of the contract. This method sets the topic to the signature of event, and does not support additional topics.
2. `Function` - (optional) If you pass a callback as the last parameter it will immediately start watching and you don't need to call `myEvent.watch(function(){})`. See [this note](#using-callbacks) for details.

##### Callback return
`Object` - See [Contract Events](#contract-events) for more.

##### Example
```js
var MyContract = vnt.core.contract(abi);
var myContractInstance = MyContract.at('0x78e97bcc5b5dd9ed228fed7a4887c0d7287344a9');
// watch for an event with {some: 'args'}
var events = myContractInstance.allEvents({fromBlock: 0, toBlock: 'latest'});
events.watch(function(error, result){
  ...
});
// would get all past logs again.
events.get(function(error, logs){ ... });
...
// would stop and uninstall the filter
events.stopWatching();
```

***

#### Contract codeFile
```js
// initialize a contract instance with abi and
// load the code file
var contract = vnt.core.contract(abi).codeFile(codeFile)
...
```
Load the contract code file into contract body.

##### Parameters
1. `string` - Code file path.

##### Returns
`Object` - The Contract instance.

##### Example
```js
// initialize a contract instance with abi and
// load the code file
var contract = vnt.core.contract(abi).codeFile(codeFile)

// make the constructor data for contract deployment
var data = contract.packContructorData(1000000000, "bitcoin", "BTC")
console.log("data: ", data)
// get the nonce of the address
var nonce = vnt.core.getTransactionCount(account1.address);

// make a transaction
var options = {
   nonce: vnt.toHex(nonce),
   gasPrice: vnt.toHex(30000000000000),
   gasLimit: vnt.toHex(4000000),
   value: '0x00',
   data: data
}

var tx = new Tx(options);

// sign the transaction
tx.sign(new Buffer(account1.privateKey.substring(2,), "hex"));

// serialize the transaction
var serializedTx = tx.serialize();

// send the transaction
vnt.core.sendRawTransaction('0x' + serializedTx.toString('hex'),
function(err, txHash) {
  if (err) {
      console.log("err happened: ", err)
  } else {
      console.log("transaction hash: ", txHash);
  }
});
```

***

#### Contract packContructorData
```js
// initialize a contract instance with abi and
// load the code file
var contract = vnt.core.contract(abi).codeFile(codeFile)
// make the constructor data for contract deployment
var data = contract.packContructorData(1000000000, "bitcoin", "BTC")
console.log(data)
...
```
Make the constructor data for contract deployment.

##### Parameters
1. `Array` - The Constructor params list.

##### Returns
`string` - The hex string data.

##### Example
```js
// initialize a contract instance with abi and
// load the code file
var contract = vnt.core.contract(abi).codeFile(codeFile)

// make the constructor data for contract deployment
var data = contract.packContructorData(1000000000, "bitcoin", "BTC")
console.log("data: ", data)
// get the nonce of the address
var nonce = vnt.core.getTransactionCount(account1.address);

// make a transaction
var options = {
   nonce: vnt.toHex(nonce),
   gasPrice: vnt.toHex(30000000000000),
   gasLimit: vnt.toHex(4000000),
   value: '0x00',
   data: data
}

var tx = new Tx(options);

// sign the transaction
tx.sign(new Buffer(account1.privateKey.substring(2,), "hex"));

// serialize the transaction
var serializedTx = tx.serialize();

// send the transaction
vnt.core.sendRawTransaction('0x' + serializedTx.toString('hex'),
function(err, txHash) {
  if (err) {
      console.log("err happened: ", err)
  } else {
      console.log("transaction hash: ", txHash);
  }
});
```


***

#### Contract packFunctionData
```js
// initialize a contract instance with abi
var contract = vnt.core.contract(abi)
// make the function data for a function call.
var data = contract.packFunctionData("GetAmount", ["0x111"]);
console.log(data)
...
```
// make the function data for a function call.

##### Parameters
1. `String` - The function name.
2. `Array` - The function params list.

##### Returns
`string` - The hex string data.

##### Example
```js
// initialize a contract instance with abi
var contract = vnt.core.contract(abi)

var data = contract.packFunctionData("GetAmount", [address]);

console.log("the data is: ", data)
// 获取账户1的下一个nonce值
var nonce = vnt.core.getTransactionCount(account1.address);

// 生成交易的结构体，指定nonce, gasPirce, gasLimit, value, data等字段
var options = {
   to: contractAddr,
   data: data
}
var result = vnt.core.call(options)
console.log(contract.unPackOutput("GetAmount", result).toString())
```

***

#### Contract unPackOutput
```js
// initialize a contract instance with abi
var contract = vnt.core.contract(abi)
// make the function data for a function call.
var result = contract.unPackOutput("GetAmount", "0x0000101010101");
console.log(data)
...
```
// make the function data for a function call.

##### Parameters
1. `String` - The function name.
2. `String` - The output hex string.

##### Returns
`Object` - The output.

##### Example
```js
// initialize a contract instance with abi
var contract = vnt.core.contract(abi)

var data = contract.packFunctionData("GetAmount", [address]);

console.log("the data is: ", data)
// 获取账户1的下一个nonce值
var nonce = vnt.core.getTransactionCount(account1.address);

// 生成交易的结构体，指定nonce, gasPirce, gasLimit, value, data等字段
var options = {
   to: contractAddr,
   data: data
}
var result = vnt.core.call(options)
console.log(contract.unPackOutput("GetAmount", result).toString())
```

<!--
#### Account decrypt
```js
// decrypt a keystore content with a password, into an account object
var kfile = "dir/of/keystore/file"
var content = fs.readFileSync(kfile).toString("utf-8")
var password = "password"
var account = vnt.account.decrypt(content, password, false)
console.log(account.address)
console.log(account.privateKey)

```
// decrypt a keystore file with a password, into an account object.

##### Parameters
1. `String` - The keystore file content.
2. `String` - The password.
3. `Boolean` - Whether it's a strict keyfile, default false

##### Returns
`Object` - The account object.

##### Example
```js
// decrypt a keystore content with a password, into an account object
var kfile = "dir/of/keystore/file"
var content = fs.readFileSync(kfile).toString("utf-8")
var password = "password"
var account = vnt.account.decrypt(content, password, false)
console.log(account.address)
console.log(account.privateKey)
```

#### Account encrypt
```js
// decrypt a keystore content with a password, into an account object
var privateKey = "privatekeytext";
vnt.account.encrypt(privateKey, "somepassword", {})
```
// decrypt a keystore file with a password, into an account object.

##### Parameters
1. `String` - The private key.
2. `String` - The password.
3. `Object` - The options used for encryption

##### Returns
`String` - The keystore content.

##### Example
```js
var privateKey = "privatekeytext";
vnt.account.encrypt(privateKey, "somepassword", {})
``` -->

***

#### vnt.core.namereg
    vnt.core.namereg
Returns GlobalRegistrar object.

##### Usage
see [namereg](https://github.com/vntchain/vnt.js/blob/master/example/namereg.html) example.

***

<!--
### vnt.shh
[Whisper  Overview](https://github.com/vntchain/wiki/wiki/Whisper-Overview)

##### Example
```js
var shh = vnt.shh;
```

***

#### vnt.shh.post
   vnt.shh.post(object [, callback])
This method should be called, when we want to post whisper message to the network.

##### Parameters
1. `Object` - The post object:
 - `from`: `String`, 60 Bytes HEX - (optional) The identity of the sender.
 - `to`: `String`, 60 Bytes  HEX - (optional) The identity of the receiver. When present whisper will encrypt the message so that only the receiver can decrypt it.
 - `topics`: `Array of Strings` - Array of topics `Strings`, for the receiver to identify messages.
 - `payload`: `String|Number|Object` - The payload of the message. Will be autoconverted to a HEX string before.
 - `priority`: `Number` - The integer of the priority in a range from ... (?).
 - `ttl`: `Number` - integer of the time to live in seconds.
2. `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](#using-callbacks) for details.

##### Returns
`Boolean` - returns `true` if the message was sent, otherwise `false`.

##### Example
```js
var identity = vnt.shh.newIdentity();
var topic = 'example';
var payload = 'hello whisper world!';
var message = {
 from: identity,
 topics: [topic],
 payload: payload,
 ttl: 100,
 workToProve: 100 // or priority TODO
};
vnt.shh.post(message);
```
-->

***

#### vnt.core.sendIBANTransaction
```js
var txHash = vnt.core.sendIBANTransaction('0x00c5496aee77c1ba1f0854206a26dda82a81d6d8', 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS', 0x100);
```
Sends IBAN transaction from user account to destination IBAN address.

##### Parameters
- `string` - address from which we want to send transaction
- `string` - IBAN address to which we want to send transaction
- `value` - value that we want to send in IBAN transaction

***

#### vnt.core.iban
```js
var i = new vnt.core.iban("XE81ETHXREGGAVOFYORK");
```

***

#### vnt.core.iban.fromAddress
```js
var i = vnt.core.iban.fromAddress('0x00c5496aee77c1ba1f0854206a26dda82a81d6d8');
console.log(i.toString()); // 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS
```

***

#### vnt.core.iban.fromBban
```js
var i = vnt.core.iban.fromBban('ETHXREGGAVOFYORK');
console.log(i.toString()); // "XE81ETHXREGGAVOFYORK"
```

***

#### vnt.core.iban.createIndirect
```js
var i = vnt.core.iban.createIndirect({
 institution: "XREG",
 identifier: "GAVOFYORK"
});
console.log(i.toString()); // "XE81ETHXREGGAVOFYORK"
```

***

#### vnt.core.iban.isValid
```js
var valid = vnt.core.iban.isValid("XE81ETHXREGGAVOFYORK");
console.log(valid); // true
var valid2 = vnt.core.iban.isValid("XE82ETHXREGGAVOFYORK");
console.log(valid2); // false, cause checksum is incorrect
var i = new vnt.core.iban("XE81ETHXREGGAVOFYORK");
var valid3 = i.isValid();
console.log(valid3); // true
```

***

#### vnt.core.iban.isDirect
```js
var i = new vnt.core.iban("XE81ETHXREGGAVOFYORK");
var direct = i.isDirect();
console.log(direct); // false
```

***

#### vnt.core.iban.isIndirect
```js
var i = new vnt.core.iban("XE81ETHXREGGAVOFYORK");
var indirect = i.isIndirect();
console.log(indirect); // true
```

***

#### vnt.core.iban.checksum
```js
var i = new vnt.core.iban("XE81ETHXREGGAVOFYORK");
var checksum = i.checksum();
console.log(checksum); // "81"
```

***

#### vnt.core.iban.institution
```js
var i = new vnt.core.iban("XE81ETHXREGGAVOFYORK");
var institution = i.institution();
console.log(institution); // 'XREG'
```

***

#### vnt.core.iban.client
```js
var i = new vnt.core.iban("XE81ETHXREGGAVOFYORK");
var client = i.client();
console.log(client); // 'GAVOFYORK'
```

***

#### vnt.core.iban.address
```js
var i = new vnt.core.iban('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS');
var address = i.address();
console.log(address); // '00c5496aee77c1ba1f0854206a26dda82a81d6d8'
```

***

#### vnt.core.iban.toString
```js
var i = new vnt.core.iban('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS');
console.log(i.toString()); // 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS'
```
