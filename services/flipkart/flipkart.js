/**
 * Flipkart file
 */
var request = require('request');
var fkFilter = require('./flipkartFilter.js');


function startOnFlipkart(item){
	var itemName = item.split(' ');
	var url = 'https://affiliate-api.flipkart.net/affiliate/search/json?query=';
	var headers = { 
			'Fk-Affiliate-Id': 'kulwantsi',
			'Fk-Affiliate-Token' : '8fac5b7dd7cd40e5acdf22930f89c309' 
	};

	for(var i = 0;i< itemName.length-1; i++){
		url += itemName[i];
	}

	if(item.length > 0){
		url += itemName[itemName.length-1]+'&resultCount=10';
	}

	request.get({ url: url, headers: headers }, function (e, r, body) {
		// your callback body
//		console.log(body);
		var json = JSON.parse(body);
		var arrayOfItems = [];
		var bodyArray = json.productInfoList;
		var jsonForMap = {
				
		}
		var count = 0;
		for(var i = 0;i < bodyArray.length;i++){
			if(bodyArray[i] != null){
				jsonForMap[count++] = i;
				arrayOfItems.push(bodyArray[i].productBaseInfo.productAttributes.title);
			}
		}
		console.log(jsonForMap);
		var index = fkFilter.forGettingSingleItemFromList(arrayOfItems,item);
		console.log('=========='+index);
		console.log(bodyArray[jsonForMap[index]].productBaseInfo.productAttributes.maximumRetailPrice.amount);
	});
}

exports.startOnFlipkart = startOnFlipkart;