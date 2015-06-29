var pageOpener = require('./../pageOpener.js');
var snapdealUrl = 'http://www.snapdeal.com/';
var jsonParser = require('./../jsonParser.js');

/*
	here is 3 indexes used in getting item from list
 */

var forSearching = {
		'form' : true,	
		'inputBoxID' : 'keyword' ,
		'formId' : 'formSearch'
}

var forGettingItemFromList = {
		'SearchListBoxId' : 'products-main4',	
		'productGridRowClass' : 'product_grid_row',
		'rowPref' : 0,
		'singleProductClass' : 'product_grid_cont',
		'itemPref' : 0,
		'itemTag' : 'a',
		'tagPref' : 1
}

var forGettingPrice = {
		'priceTagId1' : 'selling-price-id'
}

var forGettingUserRating = {
		'userRatingBlockId' : 'ratingOverReview',
		'userRating' : 'rating',
		'divForUserRating' : 'span'
}

var forGettingProductImage = {
		'mainBlockId' : 'product-slider',
		'tagsName' : 'img'
}

var forGettingProductName = {
		'mainBlockClass' : 'pdpName',
		'mainBlockIndex' : 0,
		'tagsName' : 'h1',
		'tagsNameIndex' : 0
}

var forGettingProductDescription = {
		'mainBlockClass' : 'details-content',
		'mainBlockClassIndex' : 0,
		'detailDivClass' : 'MsoNormal',
		'detailDivIndex' : 1,
		'tagsName' : 'span',
		'tagsNameIndex' : 0
}

var forGettingSellerName = {
		'mainBlockId' : 'vendorName'
}

function startOnSnapdeal(page,item,cb){
	var count = 0;

	console.log('snapdeal Started');

	console.log('fetching your result set');

	page.open(snapdealUrl);
	page.onConsoleMessage = function(msg, lineNum, sourceId) {
		console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
	};

	page.onError = function(msg, trace) {

		var msgStack = ['ERROR: ' + msg];

		if (trace && trace.length) {
			msgStack.push('TRACE:');
			trace.forEach(function(t) {
				msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
			})
		}

		console.log(msgStack.join('\n'));

	};

	page.onLoadFinished = function(status) {
		console.log('==============================================='+status);
		count++;
		console.log(count);
		if(count == 1){
			page.render('./downloaded/snapdealHomePage.png');
			pageOpener.snapdeal.searching(page,item);
		}
		else if(count == 2){
			page.render('./downloaded/snapdealItemList.png');
			pageOpener.snapdeal.forGettingFromList(page,item);
		}
		else if(count == 3){
			page.render('./downloaded/snapdealItem.png');
			var price,userRating,productName,productDescription,seller;
			price = pageOpener.snapdeal.forGettingPrice(page);
			userRating = pageOpener.snapdeal.forGettingUserRating(page);
			productName = pageOpener.snapdeal.forGettingProductName(page);
			productDescription = pageOpener.snapdeal.forGettingProductDescription(page);
			seller = pageOpener.snapdeal.forGettingSellerName(page);
//			image = pageOpener.amazon.forGettingProductImage(page);
			// need to do processing
			var jsonResponse = {
					'name' : productName,
					'price' : price,
					'rating' : userRating,
					'description' : productDescription,
					'seller' : seller,
					'lineGraph' : false
			}
//			page.clipRect = image;
//			page.render('productImage.png');
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
exports.startOnSnapdeal = startOnSnapdeal;
exports.forSearching = forSearching;
exports.forGettingItemFromList = forGettingItemFromList;
exports.forGettingPrice = forGettingPrice;
exports.forGettingUserRating = forGettingUserRating;
exports.forGettingProductImage = forGettingProductImage;
exports.forGettingProductName = forGettingProductName;
exports.forGettingProductDescription = forGettingProductDescription;
exports.forGettingSellerName = forGettingSellerName;