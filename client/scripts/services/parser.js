angular.module('priceFetcher').service('parser',function(){
	
	this.checkEmpty = function(data){
		var status = true;
		console.log(data);
		if(data == undefined || data == '')
			status = false;
		
		return status;
	}
	
});