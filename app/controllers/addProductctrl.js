
app.controller('add-new-product',function($scope,$http){
	$scope.productdata = {};
	var data = {};

	$scope.addProduct = function(){
		data = {
            "producttype":$scope.productdata.producttype,
            "productbrand":$scope.productdata.productbrand,
            "productname":$scope.productdata.productname,
            "productprice":$scope.productdata.productprice
        };
		 
		console.log("payload in add product function:"+data);

		$http.post("/product",data).then(function(response){
     	   if(response.data.error == 0){
    	        console.log("successfully added the product");
    	        window.location.href = '/';
     	   }else{
                console.log("failed adding the product");
     	   }
   		});
   		$scope.productdata = {};
	};
});
