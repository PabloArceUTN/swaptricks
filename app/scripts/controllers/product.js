'use strict';

/**
* @ngdoc function
* @name swaptricksApp.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the swaptricksApp
*/
angular.module('swaptricksApp')
.controller('ProductCtrl', function ($scope, $http, $location, $rootScope, Authtoken) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  //AUTHENTICATION Acces
  $scope.inspectSession =  Authtoken.query(function() {
    console.log('Acces');
  }, function(error) {
    console.log(error);
    window.location = "http://localhost:9000/#/?reload";
  });

  //Entyties
  $scope.items;
  $scope.myProducts;
  //Selected product Entytie
  $scope.productSelected = {};
  $scope.productSelectedOwn = false;
  $scope.productSelectedDisabled = " ";
  //Loader function
  $scope.loadProducts = function(id) {
    if (!id)
    var url = `http://api.swapingzone.com:3000/products?token=${localStorage.token}`;
    else
    var url = `http://api.swapingzone.com:3000/products?token=${localStorage.token}&user_id=${localStorage.type}`
    $http.get(url)
    .then(function successCallback(response) {
      console.log(response);
      if (!id)
      $scope.items = response.data;
      else
      $scope.myProducts = response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  $scope.deleteProduct = function(product){
    var url = `http://api.swapingzone.com:3000/products/${product}?token=${localStorage.token}`;
    $http.delete(url).then(function successCallback(responce){
      alert("Congrats...product deleted :)");
      console.log(responce);
      $location.path('/');
    }, function errorCallback(responce){
      WrongFeedback(responce);
      console.log(responce);
    });
  }
  //Execute loader function
  $scope.loadProducts(false);
  $scope.loadProducts(true);

  //Set products Entyties
  $scope.setTradeProduct = function(pProduct){
    console.log(pProduct);
    $scope.productSelected = pProduct;
    // $scope.productSelectedImage = pProduct.
    //Can't trade with it self
    if (pProduct.user_id==localStorage.type) {
      $scope.productSelectedOwn = true;
      $scope.productSelectedDisabled = "disabled";
    }else {
      $scope.productSelectedOwn = false;
      $scope.productSelectedDisabled = " ";
    }
  }
  // $scope.loadProducts();
  // $rootScope.chekToken();
  // $rootScope.$emit("chekToken");
});
