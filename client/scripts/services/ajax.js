angular.module('priceFetcher').service('ajaxCall',function($http){
	
	this.ajaxPost = function(data){
			var url = data.url;
			var dat = data.data;
			var successCb = data.success;
			var scope = data.scope;
			$http.post(url, dat).
			success(function(data, status, headers, config) {
					successCb(scope,data);
			}).
			error(function(data, status, headers, config) {
					console.log(data);
			});
	}
	
});