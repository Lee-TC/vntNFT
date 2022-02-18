var Vnt = require('./lib/vnt');

// dont override global variable
if (typeof window !== 'undefined' && typeof window.Vnt === 'undefined') {
    window.Vnt = Vnt;
}

module.exports = Vnt;
