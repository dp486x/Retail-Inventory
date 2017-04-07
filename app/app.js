// var app = angular.module('myApp', ['ui.router','angular-loading-bar','angularUtils.directives.dirPagination']);

// app.config(['$stateProvider','$urlRouterProvider',
//     function ($stateProvider,$urlRouterProvider) {
//         $urlRouterProvider.otherwise('/home');
//         $stateProvider
//             .state('home', {
//                 url: "/home",
//                 templateUrl: "templates/home.html"
//             })
//             .state('Newbook', {
//                 url: "/addnew",
//                 templateUrl: "templates/newbook.html"
//             })
//             .state('Editbook', {
//                 url: "/editbook",
//                 templateUrl: "templates/editbook.html"
//             })
//     }
// ]);
///////////////////////////////////////////////////////

var app = angular.module("myApp", []);

// app.config(function($routeProvider) {
//     $routeProvider
//     .when("/", {
//         templateUrl : "../templates/homepage.html"
//     })
//     .when("/add", {
//         templateUrl : "../templates/addproduct.html"
//     })
//     .when("/edit", {
//         templateUrl : "../templates/editproduct.html"
//     })
//     .otherwise({
//     	templateUrl : "../templates/homepage.html"
//     })
// });

// app.controller('product-list',function($scope,$state,$http,sharedbook,$filter){
//     $scope.product = {};
//     $scope.pageSize = 5;
//     $scope.currentPage = 1;
//     $http.get("http://localhost:4000/product").then(function(response){
//         if(response.error === 0){
//             $scope.productlist = response.products;
//             $scope.items2 = $scope.productlist;
//             $scope.$watch('searchBook', function(val){ 
//                 $scope.productlist = $filter('searchFor')($scope.items2, val);
//             });
//         }else{
//             $scope.productlist = [];
//         }
//     });
    
//     $scope.editBook = function($index){
//         $scope.number = ($scope.pageSize * ($scope.currentPage - 1)) + $index;
//         sharedbook.setProperty($scope.booklist[$scope.number]);
//         $state.go('Editbook');
//     };
    
// });


app.controller('book-list',function($scope,$state,$http,sharedbook,$filter){
    $scope.booklist = {};
    $scope.pageSize = 5;
    $scope.currentPage = 1;
    $http.get("http://localhost:8080/book").success(function(response){
        if(response.error === 0){
            $scope.booklist = response.Books;
            $scope.items2 = $scope.booklist;
            $scope.$watch('searchBook', function(val){ 
                $scope.booklist = $filter('searchFor')($scope.items2, val);
            });
        }else{
            $scope.booklist = [];
        }
    });
    
    $scope.editBook = function($index){
        $scope.number = ($scope.pageSize * ($scope.currentPage - 1)) + $index;
        sharedbook.setProperty($scope.booklist[$scope.number]);
        $state.go('Editbook');
    };
    
});

// app.controller('add-new-product',function($scope,$http,$state){
//     $scope.productdata = {};
//     $scope.hello="hello";

//     $scope.addproduct = function(){
// console.log("inside the addproduct()");
//         var payload = {
//             "producttype":$scope.productdata.producttype,
//             "productbrand":$scope.productdata.productbrand,
//             "productname":$scope.productdata.productname,
//             "productprice":$scope.productdata.productprice
//         }
//         $http.post("http://localhost:4000/product",payload).success(function(res){
//             if(res.error == 0){
//                 $state.go("home");
//             }else{
                
//             }
//         });
//     };
// });

// app.controller('edit-book',function($scope,$http,$state,sharedbook){
//     $scope.bookdata = sharedbook.getProperty();
//     $scope.updateBook = function(){
//         var payload = {
//             "id":$scope.bookdata._id,
//             "bookname":$scope.bookdata.bookname,
//             "authorname":$scope.bookdata.authorname,
//             "price":$scope.bookdata.price
//         }
//         $http.put("http://localhost:8080/book",payload).success(function(res){
//             if(res.error == 0){
//                 $state.go("home");
//             }else{
                
//             }
//         });
//     };
//     $scope.cancel = function(){
//         $state.go("home");
//     };
// });

// $scope.deleteBook = function($index){
//     $scope.number = ($scope.pageSize * ($scope.currentPage - 1)) + $index;
//     $http.delete("http://localhost:8080/book/"+$scope.booklist[$scope.number].bookname).success(function(res){
//         if(res.error == 0){
//             $state.go($state.current, {}, {reload: true});
//         }else{
            
//         }
//     });
// };

// app.filter('searchFor', function(){
//     return function(arr, searchBook){
//         if(!searchBook){
//             return arr;
//         }
//         var result = [];
//         searchBook = searchBook.toLowerCase();
//         angular.forEach(arr, function(item){
//             if(item.bookname.toLowerCase().indexOf(searchBook) !== -1 || item.authorname.toLowerCase().indexOf(searchBook) !== -1){
//             result.push(item);
//         }
//         });
//         return result;
//     };
// });