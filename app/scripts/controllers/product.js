'use strict';

/**
* @ngdoc function
* @name swaptricksApp.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the swaptricksApp
*/
angular.module('swaptricksApp')
.controller('ProductCtrl', function ($scope, $http, $location, $rootScope) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  //Entyties
  $scope.items;
  $scope.myProducts;
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
  //Execute loader function
  $scope.loadProducts(false);
  $scope.loadProducts(true);

  // $scope.loadProducts();
  // $rootScope.chekToken();
  // $rootScope.$emit("chekToken");
});
