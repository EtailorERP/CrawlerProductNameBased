/**
 * @author Kulwant
 * 
 * Jun 23, 2015
 * 
 */

var getDataFromInnerHtmlOfTag = function(tag,str){
	console.log(tag);
	var temp = '';
	var value = '';
	var count = -1;
	for(var i = 0;i < str.length-1; i++){
		temp = '';
		count++;
		var ch = str.charAt(i);
		if(ch == '<' && str.charAt(i+1) != '/'){
		
			while(str.charAt(i)!='>') {
						temp += str.charAt(i);
						i++;
					}
					i++;
					var arr = temp.split(' ');
					console.log(arr[0]);
					if( arr[0] == '<'+tag ){
						while(str.charAt(i) != '<')	{
							value += str.charAt(i);
							i++;
						}
					}
		}
		
	}
	
	console.log(value);
	return value;

}
