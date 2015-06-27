var cluster = require('cluster');


if (cluster.isMaster) {

	var cpuCount = require('os').cpus().length;

	// Create a worker for each CPU
	for (var i = 0; i < cpuCount; i += 1) {
		cluster.fork();
	}
	cluster.on('exit', function (worker) {

		// Replace the dead worker,
		// we're not sentimental
		console.log('Worker ' + worker.id + ' died :(');
		cluster.fork();

	});
} else {



	var express = require('express');
	var bodyParser = require('body-parser');
	var app = express();
	var exec = require('child_process').exec;
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	var parser = require('./server/services/outputParser.js');

	app.use("/scripts",  express.static(__dirname + '/client/scripts/'));
	app.use("/images",express.static(__dirname + '/client/images/'));
	app.use("/styles",express.static(__dirname + '/client/styles/'));

	app.get('/',function(req,res){
		res.sendFile(__dirname+'/client/index.html');
		//res.end('done');
	});


	app.post('/priceCheck',function(req,res){
		var data = {
				'amazonUrl' : req.body.amazonUrl,
				'snapdealUrl' : req.body.snapdealUrl,
				'flipkartUrl' : req.body.flipkartUrl,
				'paytmUrl' : req.body.paytmUrl
		}
		var shelljs = require('shelljs');
		exec('phantomjs click.js '+data.amazonUrl+' '+data.snapdealUrl+' '+data.flipkartUrl+' '+data.paytmUrl,function(data){

		});
		console.log('print price in nodejs');
		var fs = require('fs');

		fs.readFile('output.txt','utf8',function(err,data){
			res.send(data);
		});
	});

	app.post('/amazonPrice',function(req,res){
		var data = {
				'itemName' : req.body.itemName
		}

		exec('phantomjs click.js AMAZON "'+data.itemName+'"',function(err,out,code){
			console.log(out);
			var responseToSend = parser.outputFromScriptParser(out);
			res.send(responseToSend);
			console.log('============================================='+responseToSend.price);
		});
	});


	app.post('/snapdealPrice',function(req,res){
		var data = {
				'itemName' : req.body.itemName
		}
		exec('phantomjs click.js SD "'+data.itemName+'"',function(err,out,code){
			var responseToSend = parser.outputFromScriptParser(out);
			res.send(responseToSend);
			console.log('============================================='+responseToSend);
		});

	});

	app.post('/flipkartPrice',function(req,res){
		var data = {
				'itemName' : req.body.itemName
		}
		var shelljs = require('shelljs');
		console.log(data);
		var outputVar ;
		var outputVar = shelljs.exec('phantomjs click.js FK "'+data.itemName+'"');
		var responseToSend = parser.outputFromScriptParser(outputVar);
		res.send(responseToSend);
		console.log('============================================='+responseToSend);

	});



	app.post('/getBasicDetail',function(req,res){
		var data = {
				'amazonUrl' : req.body.amazonUrl,
				'snapdealUrl' : req.body.snapdealUrl,
				'flipkartUrl' : req.body.flipkartUrl,
				'paytmUrl' : req.body.paytmUrl
		}
		var shelljs = require('shelljs');
		shelljs.exec('phantomjs click.js '+data.amazonUrl+' '+data.snapdealUrl+' '+data.flipkartUrl+' '+data.paytmUrl);
		console.log('print price in nodejs');
		var fs = require('fs');

		fs.readFile('output.txt','utf8',function(err,data){
			res.send(data);
		});
	});

	app.listen(3005,function(){
		console.log("App Started on PORT 3005");
	});
}