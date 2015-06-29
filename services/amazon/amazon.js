var pageOpener = require('./../pageOpener.js');
var amazonUrl = 'http://www.amazon.in/';
var jsonParser = require('./../jsonParser.js');
/*
	here is one index used in getting item from list
*/

var forSearching = {
	'form' : true,	
	'inputBoxID' : 'twotabsearchtextbox' ,
	'formClass' : 'nav-searchbar'
}
			
var forGettingItemFromList = {
	'uoSearchList' : 's-results-list-atf',	
	'firstItem' : 'result_0',
	'tagToOpen' : 'a'
}

var forGettingPrice = {
	'priceTagId1' : 'priceblock_saleprice',
	'priceTagId2' : 'priceblock_ourprice'
}

var forGettingUserRating = {
	'ratingBlockId' : 'revSum',
	'listOfRatings' : 'tr',
	'ratingDivClass' : 'a-nowrap',
	'indexForRatingDiv' : 1,
	'tagToFetch' : 'a'
		
}

var forGettingProductImage = {
	'mainBlockId' : 'product-slider',
	'tagsName' : 'img'
}

var forGettingProductName = {
	'titleId' : 'productTitle'
}

var forGettingProductDescription = {
	'mainDivId' : 'productDescription',
	'contentClass' : 'productDescriptionWrapper',
	'contentIndex' : 0
}

function startOnAmazon(page,item,cb){
	var count = 0;
	console.log('amazon Started');
	page.open(amazonUrl);	
	page.onLoadFinished = function(status) {
	  console.log('================================================='+status);
	  count++;
	  console.log(count);
	  if(count == 2){
		page.render('./downloaded/amazonHomePage.png');
		pageOpener.amazon.searching(page,item);
	  }
	  else if(count == 3){
		page.render('./downloaded/amazonItemList.png');
		pageOpener.amazon.forGettingFromList(page);
	  }
	  else if(count == 4){		  
		page.render('./downloaded/amzonItem.png');
		var price,userRating,name,description;
		price = pageOpener.amazon.forGettingPrice(page);
		userRating = pageOpener.amazon.forGettingUserRatings(page);
		name = pageOpener.amazon.forGettingProductName(page);
		description = pageOpener.amazon.forGettingProductDescription(page);
//		 need to do processing
		var jsonResponse = {
				'name' : name ,
				'price' : price,
				'rating' : userRating,
				'description' : description,
				'lineGraph' : true
		}
		jsonResponse = jsonParser.jsonToString(jsonResponse);
		cb(jsonResponse);
	  }

	}
	
	page.onResourceRequested = function(requestData, networkRequest) {
//		console.log(requestData.headers);
		var list = requestData.url.split(".");
		var len = list.length;
		var str = list[len-1];
		if(str.length == 3 && (str=='jpg' || str=='gif' || str=='png')){
			networkRequest.abort();
		}
	};

}

exports.startOnAmazon = startOnAmazon;
exports.forSearching = forSearching;
exports.forGettingItemFromList = forGettingItemFromList;
exports.forGettingPrice = forGettingPrice;
exports.forGettingUserRating = forGettingUserRating;
exports.forGettingProductImage = forGettingProductImage;
exports.forGettingProductDescription = forGettingProductDescription;
exports.forGettingProductName = forGettingProductName;