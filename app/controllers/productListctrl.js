app.controller('product-list',function($scope, $http, $route, $routeParams){
   $scope.productlist = {};

   //////////////get list///////////
   var getlist = function(){
   		$http.get("http://localhost:4000/product/").then(function(response){
    		// console.log("get success");
    		// console.log(response);
	    	if(response.data.error === 0){
    		$scope.productlist = response.data.products;
    		// console.log("from the main  getlist:  "+response.data.products)
    		// var prodlist1 = response.data.products;
    		}else{
            	$scope.productlist = [];
    	    }
  		});
   }; 
   ////////end of get list///////////   
    getlist();

	/////Remove a product/////////////////////////
	$scope.deleteProduct = function($index){
  		var productname = $scope.productlist[$index].Name;
		// console.log(productname);
	    $http.delete("http://localhost:4000/product/" +productname).then(function(response){
    	    if(response.data.error == 0){
        	    // $state.go($state.current, {}, {reload: true});
            	// console.log("Deleted successfully");
            	getlist();
    	    }else{
            	// console.log("error in deleting product");
        	}
   		});
    	
	};
	//////////end of removing a product////////////////

	/////Update a Product/////

	$scope.opnUpdateProduct = function(){
		 $scope.updparm = $routeParams.productname;

		var updprod ={};
	    $http.get("http://localhost:4000/product/").then(function(response){
    		// console.log("Params"+$routeParams.productname);
    		// console.log(response);
	    	if(response.data.error === 0){
    		    var responsedata = response.data.products;

    		    // console.log("response data"+responsedata);
    		    for(i=0; i<responsedata.length;i++){
    		        if(responsedata[i]._id==$routeParams.productname){
                       $scope.updprod = responsedata[i];
    		           break;
                   }
                }
    		}else{
            	$scope.updprod = [];
    	    }
  		});

	};

	$scope.updateProduct = function(){
        var data = {
            "id":$scope.updprod._id,
            "producttype":$scope.updprod.type,
            "productbrand":$scope.updprod.Brand,
            "productname":$scope.updprod.Name,
            "productprice":$scope.updprod.price
        };
        console.log("data from updateProduct click: "+$scope.updprod.type);
        $http.put("http://localhost:4000/product",data).success(function(response){
            // console.log(response);
            if(response.error == 0){
                // console.log("data from updateProduct click SUCCESS");
                window.location.href = '/';
            }else{
                // console.log("data from updateProduct click FAILED");
            }
        });
    };
    /////end of Updating a Product/////

});