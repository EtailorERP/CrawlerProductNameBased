/**
 * @author Kulwant
 * 
 * Jun 10, 2015
 * 
 */

// does not work well when zeroes are in starting after decimal adn returns first number from array
function getNumbersFromString(line)
{
	line +=' ';
	var number = [];
	var statusForNumber = false;
	var tokens = [',' ,
	              '.'];
	var num = 0;
	for(var i= 0 ;i < line.length;i++){
		var ch = line.charAt(i);
		if(checkNumber(ch)){
			statusForNumber = true;	
			num = num*10 + parseInt(ch);
		}
		else if(statusForNumber && ((ch == tokens[0]))){
			statusForNumber = false;
		}
		else{
			if(num != 0)
				number.push(num);
			num=0;
			statusForNumber = false ;
		}
	}

	return number[0];
}

function checkNumber(c)
{
	var status = false;
	if(parseInt(c) <= 9 && parseInt(c) >= 0)
	{
		status = true;
	}

	return status;
}


function jsonToString(jsonObject){
	return JSON.stringify(jsonObject);
}


exports.getNumbersFromString = getNumbersFromString;