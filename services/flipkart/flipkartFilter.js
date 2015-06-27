/**
 * FlipkartFilter file
 */

var hashmap = require('hashmap').HashMap;

function forGettingSingleItemFromList(arrayOfItems,item){

	console.log('kuwlantsingh');
	console.log(arrayOfItems.length);
	var itemDescArray = item.split(' ');
	var indexToReturn;
	var Max = 10;
	var mainMap = new hashmap();
	console.log(itemDescArray);

	for(var i = 0; i< arrayOfItems.length; i++){
		var name = arrayOfItems[i];
		var words = name.split(' ');
		var tempMap = new hashmap();
		mainMap.set(i,tempMap);
		for(var j=0;j<words.length;j++){
			tempMap.set(words[j],1);
		}
	}

	console.log(arrayOfItems);

	for(var i=0; i < arrayOfItems.length; i++){
		var map = mainMap.get(i);
		for(var j=0; j < itemDescArray.length; j++){
			if(map.has(itemDescArray[j])){
				map.remove(itemDescArray[j]);
			}
		}


		// Trying to find lowest length
		if(Max>map.count()){
			indexToReturn = i;
			Max = map.count();
		}
	}
	console.log('============s'+indexToReturn);
	return indexToReturn;

}

exports.forGettingSingleItemFromList = forGettingSingleItemFromList;