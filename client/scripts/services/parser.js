angular.module('priceFetcher').service('parser',function(){
	
	this.checkEmpty = function(data){
		var status = true;
		console.log(data);
		if(data == undefined)
			status = false;
		
		return status;
	}
	
});