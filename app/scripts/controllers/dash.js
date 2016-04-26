'use strict';

/**
* @ngdoc function
* @name swaptricksApp.controller:DashCtrl
* @description this is the user's dashboard
* # DashCtrl
* Controller of the swaptricksApp
*/
angular.module('swaptricksApp')
.controller('DashCtrl', function ($scope, $http) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  //TRADE!
  $scope.trade = function(pSelected) {
    console.log(sel);
    if (!$scope.productSelectedOwn) {
      //Proces  the trade
      console.log("trade");
    }
    console.log("nope");
    console.log("pass");
  }

  // $scope.loadTransfer = function(){
  //   $http.get(`http://api.swapingzone.com:3000/check?token=${localStorage.token}`)
  //   .then(function successCallback(response) {
  //     console.log(response);
  //   }, function errorCallback(response) {
  //     console.log(response);
  //     $location.path('/');
  //     return;
  //   });
  // }
  // $scope.loadTransfer();
  // $rootScope.chekToken();
  // $rootScope.$emit("chekToken");
});
