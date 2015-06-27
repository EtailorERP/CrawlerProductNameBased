var express = require('express');
var request = require('request')
var app = express();
var shelljs = require('shelljs');
var exec = require('child_process').exec;
var parser = require('./server/services/outputParser.js');


console.log('starting');
//var exec = require('exec');

exec('phantomjs click.js SD "Apple iPhone 4S (White, 8GB)"',function(err,out,code){
	console.log(out);
	var responseToSend = parser.outputFromScriptParser(out);
	console.log('============================================='+responseToSend.price);
});

//var shelljs = require('shelljs');
//var outputVar ;
//var outputVar = shelljs.exec('phantomjs click.js SD "Apple iPhone 4S (White, 8GB)"');
//console.log(outputVar);
//var responseToSend = parser.outputFromScriptParser(outputVar);
//console.log('============================================='+responseToSend.price);
//app.use("/services",  express.static(__dirname + '/services/'));
//
//app.post('/flipkart',function(req,res){
//
//})

