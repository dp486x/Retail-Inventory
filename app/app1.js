var app = angular.module('myApp',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		
		.when('/', {
			templateUrl:'templates/homepage.html',
			controller:'product-list'
		})
		.when('/addproduct', {
			templateUrl:'templates/addproduct.html',
			controller:'add-new-product'
		})
		.when('/:productname/editproduct', {
			templateUrl:'templates/editproduct.html',
			controller:'product-list'
		});
});
