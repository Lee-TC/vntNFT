# VNTChain JavaScript API

[![Join the chat at https://gitter.im/vntchain/vnt.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/vntchain/vnt.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is the VNTChain compatible [JavaScript API](https://github.com/vntchain/wiki/wiki/JavaScript-API)
which implements the [Generic JSON RPC](https://github.com/vntchain/wiki/wiki/JSON-RPC) spec. It's available on npm as a node module, for bower and component as an embeddable js and as a meteor.js package.

<!--
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![dependency status][dep-image]][dep-url] [![dev dependency status][dep-dev-image]][dep-dev-url] -->

<!-- [![browser support](https://ci.testling.com/vntchain/vntchain.js.png)](https://ci.testling.com/vntchain/vntchain.js) -->

You need to run a local VNTChain node to use this library.

[Documentation](https://github.com/vntchain/vnt.js/blob/master/doc/api-reference.md)

## Installation

### Node.js

```bash
npm install vnt
```

### Yarn

```bash
yarn add vnt
```

### Meteor.js

```bash
meteor add vntchain:vnt
```

### As Browser module
Bower

```bash
bower install vnt
```

Component

```bash
component install vntchain/vnt.js
```

* Include `vnt.min.js` in your html file. (not required for the meteor package)

## Usage
Use the `vnt` object directly from global namespace:

```js
console.log(vnt); // {vnt: .., shh: ...} // it's here!
```

Set a provider (HttpProvider)

```js
if (typeof vnt !== 'undefined') {
  vnt = new Vnt(vnt.currentProvider);
} else {
  // set the provider you want from Vnt.providers
  vnt = new Vnt(new vnt.providers.HttpProvider("http://localhost:8545"));
}
```

Set a provider (HttpProvider using [HTTP Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication))

```js
vnt.setProvider(new vnt.providers.HttpProvider('http://host.url', 0, BasicAuthUsername, BasicAuthPassword));
```

There you go, now you can use it:

```js
var coinbase = vnt.core.coinbase;
var balance = vnt.core.getBalance(coinbase);
```

You can find more examples in [`example`](https://github.com/vntchain/vnt.js/tree/master/example) directory.


## Contribute!

### Requirements

* Node.js
* npm

```bash
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install nodejs-legacy
```

### Building (gulp)

```bash
npm run-script build
```


### Testing (mocha)

```bash
npm test
```

### Community
 - [Gitter](https://gitter.im/vntchain/vnt.js?source=orgpage)
 <!--  [Forum](https://forum.ethereum.org/categories/ethereum-js) -->


<!-- ### Other implementations
 - Python [Vnt.py](https://github.com/ethereum/vnt.py)
 - Haskell [hs-vnt](https://github.com/airalab/hs-vnt)
 - Java [vntj](https://github.com/vntj/vntj)
 - Scala [vntj-scala](https://github.com/mslinn/vntj-scala)
 - Purescript [purescript-vnt](https://github.com/f-o-a-m/purescript-vnt)
 - PHP [vnt.php](https://github.com/sc0Vu/vnt.php) -->


[npm-image]: https://badge.fury.io/js/vnt.svg
[npm-url]: https://npmjs.org/package/vnt
[travis-image]: https://travis-ci.org/ethereum/vnt.js.svg
[travis-url]: https://travis-ci.org/ethereum/vnt.js
[dep-image]: https://david-dm.org/ethereum/vnt.js.svg
[dep-url]: https://david-dm.org/ethereum/vnt.js
[dep-dev-image]: https://david-dm.org/ethereum/vnt.js/dev-status.svg
[dep-dev-url]: https://david-dm.org/ethereum/vnt.js#info=devDependencies
<!-- [coveralls-image]: https://coveralls.io/repos/ethereum/vnt.js/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/r/ethereum/vnt.js?branch=master
[waffle-image]: https://badge.waffle.io/ethereum/vnt.js.svg?label=ready&title=Ready
[waffle-url]: https://waffle.io/ethereum/vnt.js -->
