var fs = require("fs")
var vntkit = require("vnt-kit")

var ksdir="../ks/";
var kfile="Wed, 22 Dec 2021 11_51_40 GMT";
var password="vnt123456";

function openAccount(file, passwd) {
    var content = fs.readFileSync(file).toString("utf-8")
    return vntkit.account.decrypt(content, passwd, false)
}

var account = openAccount(ksdir + kfile, password);

module.exports = account