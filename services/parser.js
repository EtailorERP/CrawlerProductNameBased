function makeArrayFromTag(str){

	var statusForTagStart = false;
	var statusForInputStart = false;
	var arr = [];
	var count = 0;
	arr[count] = '';
	// for(var i=0;i<str.length-1;i++){
		// var ch = str.charAt(i);
		// if(ch == '<' && statusForInputStart)
		// {
			// count++;
			// statusForInputStart = false;
			// if(str.charAt(i+1) == '/')
				// statusForTagStart = true;
		// }
		// else if(ch == '>' && !statusForInputStart && !statusForTagStart){
			// statusForTagStart = true;
			// statusForInputStart = true;
		// }
		// else if(statusForInputStart){
			// arr[count].append(ch);
		// }
	// }
	
	for(var i=0;i<str.length;i++){
		var ch = str.charAt(i);
		if(ch == '<'){
			statusForInputStart = true;
		}
		else if(ch == '>'){
			count++;
			arr[count]='';
			statusForInputStart = false;
		}
		else if(statusForInputStart){
			arr[count] += ch;
		}
	}
	
    console.log(arr);
}

function getValueFromTag(tag,str){
	var arr ='';
	var statusForInputStart = false;
	arr = str.split('=');
	for(var i=0;i<str.length;i++){
		var ch = str.charAt(i);
		if(ch == '"' ){
			if(statusForInputStart)
				statusForInputStart = false;
			else 
				statusForInputStart = true;
		}
		else if(statusForInputStart){
			arr += ch;
		}
	}
	
	return arr;
}
getValueFromTag('li','<ul class="top-products clear"><li data-omnitrack="iphone_product_1570207413"><div class="product-detail"></div></a></li></ul>');