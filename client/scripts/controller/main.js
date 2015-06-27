var app = angular.module("priceFetcher", []);

app.controller("mainController", function($scope,ajaxCall,parser) {

	$scope.amazonWait = 0;
	$scope.flipkartWait = 0;
	$scope.snapdealWait = 0;
	$scope.paytmWait = 0;

	$scope.getAmazonDetails = function(){
		var dataToSend = {
				'url' : $scope.amazonUrl
		}

		// var data = {
		// ''
		// }

	}

	$scope.fetchAmazon = function(){
		var dataToSend = {
				'itemName' : $scope.itemName
		}
		var data = {
				'scope' : $scope,
				'url' : 'amazonPrice',
				'data' : dataToSend,
				'success' : function(scope,data){
					console.log(data);
					scope.amazonWait = 0;
					scope.amazonPrice = data;
				}
		}
		console.log(data);
		if(parser.checkEmpty(dataToSend.itemName)){
			$scope.amazonWait = 1;
			ajaxCall.ajaxPost(data);
		}
	}

	$scope.fetchSnapdeal = function(){
		var dataToSend = {
				'itemName' : $scope.itemName
		}
		var data = {
				'scope' : $scope,
				'url' : 'snapdealPrice',
				'data' : dataToSend,
				'success' : function(scope,data){
					console.log(data);
					scope.snapdealWait = 0;
					scope.snapdealPrice = data;
				}
		}
		console.log(data);
		if(parser.checkEmpty(dataToSend.itemName)){
			$scope.snapdealWait = 1;
			ajaxCall.ajaxPost(data);
		}
	}

	$scope.fetchFlipkart = function(){
		var dataToSend = {
				'itemName' : $scope.itemName
		}
		var data = {
				'scope' : $scope,
				'url' : 'flipkartPrice',
				'data' : dataToSend,
				'success' : function(scope,data){
					console.log(data);
					scope.flipkartWait = 0;
					scope.flipkartPrice = data;
				}
		}
		console.log(data);
		if(parser.checkEmpty(dataToSend.itemName)){
			$scope.flipkartWait = 1;
			ajaxCall.ajaxPost(data);
		}
	}


});