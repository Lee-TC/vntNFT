const express = require('express')

var cors = require('cors')

//引入路径处理模块
var createError = require('http-errors');
const path = require('path')
const formidable = require('formidable');
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Vnt = require('vnt');
var vntKit = require("vnt-kit")
const send = require("./base/send");
const getNonce = require("./base/getNonce");

vnt = new Vnt();
var CommonData = require('./base/common');

const balanceOf = require('./chainFunc/balanceOf');

vnt.setProvider(new vnt.providers.HttpProvider(CommonData.url));

//创建web服务器
const app = express();

//使用 CORS 
app.use(cors())

//静态资源访问服务器功能
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//获得用户余额
//必须提供自己的账号密码，因为每个人只能加查阅自己的余额，保护隐私
app.get('/balanceOf',(req, res)=>{
    if (req.headers.authorization == null || req.headers.code == null)
			res.status(400).send({"balance":"null","error":"authorization or code is null"});
    else{
        try{
            var account = vntKit.account.decrypt(req.headers.authorization, req.headers.code, false);
        }
        catch(e){
            res.status(500).send({"balance":null,"error":"authorization or code is false"})
        }
    }
    try {
        var balance = balanceOf(account.address)
        res.status(200).send({"balance":balance,"error":"null"})
    }
    catch(e){
        res.status(500).send({"balance":null,"error":e})
    }
})

//由管理员审核后上架，用户在确认通过审核通过时，由用户上架
app.post('/mint',(req, res)=>{
    if(req.body.name == null || req.body.hash == null || req.body.price == null || req.headers.authorization == null || req.headers.code == null)
      res.status(400).send({"status":"failed","error":"name,hash,price,address,authorization or code is null"})
    else {
        try{
            var account = vntKit.account.decrypt(req.headers.authorization, req.headers.code, false);
        }
        catch(e){
            res.status(500).send({"status":"failed","error":"authorization or code is false"})
        }
    }
    try {
        send("mint",[req.body.name,req.body.price,req.body.hash],account,getNonce(account))
        res.status(200).send({"status":"OK","error":"null"})
    } 
    catch(e){
        res.status(500).send({"status":"failed","error":e})
    } 
})


app.get('/testapi', (req, res) => {
	res.status(200).send('v1')
})

async function getreceipt(txHash) {
	return new Promise(function (resolve) {
		setTimeout(() => {
			resolve(vnt.core.getTransactionReceipt(txHash));
		}, 500);
	})
}

app.post('/getReceipt', (req, res) => {
	getreceipt(req.body.txHash).then(
		r => {
			res.status(200).send(r);
		}
	)
})


app.listen(3002)
//控制台提示输出
console.log('服务器启动成功')