console.log('{ "default" : "here in phantomjs');

var system = require('system');
//var fs = require('fs'):
//fs.remove('output.txt');
var args = system.args;

var urls = [];
args.forEach(function(arg, i) {
urls[i] = arg;
});


//var MARKET_PLACE =urls[1];
//var itemToSearch = urls[2];

var MARKET_PLACE ='SD';
var itemToSearch = 'SanDisk Cruzer Blade USB Flash Drive 16GB';

var marketPlacesToSearch = ['SD','AMAZON'];
var amazonService = require('./services/amazon/amazon.js');
var snapdealService = require('./services/snapdeal/snapdeal.js');
var config = require('./config/config.js');


function searchItemOnMP(mp,item){

	switch(mp){
	case 'AMAZON' :
	{
		var page = require('webpage').create();
		var cb = function(response){
			console.log('","actual" : '+response+'}');			
			phantom.exit(0);
		}
		var response = amazonService.startOnAmazon(page,item,cb);	
	}
	break;
	case 'SD':
	{
//		var stime = new Date();
		var page = require('webpage').create();
		var cb = function(response){
			console.log('","actual" : '+response+'}');
//			var eTime = new Date();
//			console.log(eTime);
//			console.log(eTime-stime);
			phantom.exit(0);
		}
		snapdealService.startOnSnapdeal(page,item,cb);	
	}
	}

}

phantom.onError = function(msg, trace) {
	var msgStack = ['PHANTOM ERROR: ' + msg];
	if (trace && trace.length) {
		msgStack.push('TRACE:');
		trace.forEach(function(t) {
			msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
		});
	}
	console.log(msgStack.join('\n'));
	phantom.exit(1);
}


searchItemOnMP(MARKET_PLACE,itemToSearch);
//searchItemOnMP('SD',itemToSearch);