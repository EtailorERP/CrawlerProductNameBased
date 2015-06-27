
// output in json format
function outputFromScriptParser(data){
	
	var temp = data;
	console.log(data.output);
	temp = temp.replace(/\r?\n|\r/g,"");
	var out = JSON.parse(temp);
	
	return out.actual;
}

exports.outputFromScriptParser = outputFromScriptParser;