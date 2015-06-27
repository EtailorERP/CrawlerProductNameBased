var amz = require('./amazon/amazon.js');
var sd = require('./snapdeal/snapdeal.js');
var parser = require('./services.js');

var amazon = {
		'searching' : function(page,item){
			var forSearchingRules = amz.forSearching;

			// don't use console inside here
			page.evaluate(function(forSearching,item) {
				document.getElementById(forSearching.inputBoxID).value = item;
				document.querySelector("."+forSearching.formClass).submit();
			},forSearchingRules,item);
		},

		'forGettingFromList' : function(page){
			var gettingFromListRules = amz.forGettingItemFromList;
			page.evaluate(function(forList) {
				var firstItem = document.getElementById(forList.firstItem);
				firstItem = firstItem.getElementsByTagName(forList.tagToOpen);
				// 0 but does not matter
				firstItem[0].click();
			},gettingFromListRules);
		},

		'forGettingPrice' : function(page){
			var getPriceRules = amz.forGettingPrice;
			console.log(getPriceRules);
			var price =   page.evaluate(function(priceRules) {
				if(document.getElementById(priceRules.priceTagId1) != null){
					return document.getElementById(priceRules.priceTagId1).innerHTML;
				}else if(document.getElementById(priceRules.priceTagId2) != null){
					return document.getElementById(priceRules.priceTagId2).innerHTML;
				}
				else 
				{
					return 'not able to fetch price';
				}
			},getPriceRules);
			var finalP = parser.getNumbersFromString(price);
			return finalP;
		},
		'forGettingUserRatings' : function(page){
			var userRatingRules = amz.forGettingUserRating;
			console.log('====amazonUserRating=====pageInject========'+page.injectJs('./services/amazon/amazonUserRatingFilter.js'));
			var ratings =   page.evaluate(function(ratingRules) {
				var block = document.getElementById(ratingRules.ratingBlockId);
				var list = block.getElementsByTagName(ratingRules.listOfRatings);
				var jsonObject = {
						'1' : '',
						'2' : '',
						'3' : '',
						'4' : '',
						'5' : ''
				};
				for(var i = 0; i < list.length ; i++){
					jsonObject[5-i]=getDataFromInnerHtmlOfTag(ratingRules.tagToFetch,list[i].getElementsByClassName(ratingRules.ratingDivClass)[ratingRules.indexForRatingDiv].innerHTML);
				}

				return jsonObject;
			},userRatingRules);
			return ratings;
		},
		'forGettingProductImage' : function(page){
			var imageRules = amz.forGettingProductImage;
			console.log(imageRules);
			var image =   page.evaluate(function(imageRules) {
				var block = document.getElementById('product-slider').getElementsByTagName('img');
//				var img = block.getElementsByTagName('img')[0];
//				var jsonObject = {
//				top : img.offsetTop,
//				left : img.offsetLeft,
//				width : img.width,
//				height : img.height
//				}
				return block;
			},imageRules);
			consosole.log(image);

		}
}

var snapdeal = {
		'searching' : function(page,item){
			var forSearchingRules = sd.forSearching;
			console.log('hrer in searching');
			// page.includeJs('http://code.jquery.com/jquery-2.1.4.min.js', function() {
			// don't use console inside here
			page.evaluate(function(forSearching,item) {
				document.getElementById(forSearching.inputBoxID).value = item;
				document.getElementById(forSearching.formId).submit();
			},forSearchingRules,item);
			// });
		},

		'forGettingFromList' : function(page,item){
			var gettingFromListRules = sd.forGettingItemFromList;

			console.log('======hashmap=======pageInject======='+page.injectJs('./scripts/lib/hashmap.js'));
			console.log('====snapdealFilter=====pageInject======'+page.injectJs('./services/snapdeal/snapdealFilters.js'));
			page.evaluate(function(forList,item,funDef) {
				var mainDiv = document.getElementById(forList.SearchListBoxId);
				mainDiv = mainDiv.getElementsByClassName(forList.productGridRowClass);
				mainDiv = mainDiv[forList.rowPref].getElementsByClassName(forList.singleProductClass);

				// here to call filter on mainDiv
				var arrayOfItems = [];

				for(var i = 0 ; i < mainDiv.length ; i++){
					var div = mainDiv[i];
					div = div.getElementsByClassName('product-title')[0];
					div = div.getElementsByTagName('a')[0];
					arrayOfItems[i] = div.innerHTML;
				}

				var index = forGettingSingleItemFromList(arrayOfItems,item);
				console.log(index);
				mainDiv = mainDiv[index].getElementsByTagName(forList.itemTag);

				// 1 but does not matter
				mainDiv[forList.tagPref].click();
			},gettingFromListRules,item);
		},

		'forGettingPrice' : function(page){
			var getPriceRules = sd.forGettingPrice;
			console.log(getPriceRules);
			var price =   page.evaluate(function(priceRules) {
				if(document.getElementById(priceRules.priceTagId1) != null){
					return document.getElementById(priceRules.priceTagId1).innerHTML;
				}
				else return 'not able to fetch Price';
			},getPriceRules);
			var finalP = parser.getNumbersFromString(price);
			return finalP;
		},

		'forGettingUserRating' : function(page){
			var userRatingRules = sd.forGettingUserRating;

			var userRating =   page.evaluate(function(ratingRules) {
				var div = document.getElementById(ratingRules.userRatingBlockId);

				// there was single index so it really does not matter
				div = div.getElementsByClassName(ratingRules.userRating)[0];

				var list = div.getElementsByTagName(ratingRules.divForUserRating);

				var jsonObject = {
						'rating' : '',
						'usersRated' : ''
				};

				jsonObject['rating'] = list[0].innerHTML;
				jsonObject['usersRated'] = list[1].innerHTML;

				return jsonObject;

			},userRatingRules);
			return userRating;
		},
//		'forGettingProductImage' : function(page){
//			var imageRules = sd.forGettingProductImage;
//			console.log(imageRules);
//			var image =   page.evaluate(function(imageRules) {
//				var block = document.getElementById('product-slider');
//				var img = block.getElementsByTagName('img')[0];
//				var jsonObject = {
//						top : img.offsetTop,
//						left : img.offsetLeft,
//						width : img.width,
//						height : img.height
//				}
//				return jsonObject;
//			},imageRules);
//			return image;
//		},
//		'getBasicDetails' : function(page){
//
//		},
		'forGettingProductName' : function(page){
			var productNameRules = sd.forGettingProductName;
			console.log(productNameRules);
			var productName =   page.evaluate(function(productNameRules) {
				var block = document.getElementsByClassName(productNameRules.mainBlockClass);
				block = block[productNameRules.mainBlockIndex].getElementsByTagName(productNameRules.tagsName);
				var name = block[productNameRules.tagsNameIndex].innerHTML;
				
				return name;
			},productNameRules);
			console.log(productName);
			return productName;
		},
		'forGettingProductDescription' : function(page){
			var productDescriptionRules = sd.forGettingProductDescription;
			console.log(productDescriptionRules);
			var productDescription = page.evaluate(function(productDesriptionRules){
				var block = document.getElementsByClassName(productDesriptionRules.mainBlockClass);
				block = block[productDesriptionRules.mainBlockClassIndex].getElementsByClassName(productDesriptionRules.detailDivClass);
				var description = block[productDesriptionRules.detailDivIndex].getElementsByTagName(productDesriptionRules.tagsName)[productDesriptionRules.tagsNameIndex].innerHTML;
				return description;
			},productDescriptionRules);
			return productDescription;
		}
}

exports.amazon = amazon;
exports.snapdeal = snapdeal;