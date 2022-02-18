/* jshint ignore:start */


// Browser environment
if(typeof window !== 'undefined') {
    Vnt = (typeof window.Vnt !== 'undefined') ? window.Vnt : require('vnt');
    BigNumber = (typeof window.BigNumber !== 'undefined') ? window.BigNumber : require('bignumber.js');
}


// Node environment
if(typeof global !== 'undefined') {
    Vnt = (typeof global.Vnt !== 'undefined') ? global.Vnt : require('vnt');
    BigNumber = (typeof global.BigNumber !== 'undefined') ? global.BigNumber : require('bignumber.js');
}

/* jshint ignore:end */