'use strict';

/**
* @ngdoc function
* @name swaptricksApp.controller:TransferCtrl
* @description
* # TransferCtrl
* Controller of the swaptricksApp
*/
angular.module('swaptricksApp')
.controller('TransferCtrl', function ($scope, $http, $location) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  //TRADE!
  $scope.trade = function(pSelected) {
    if (pSelected == undefined || pSelected == null) {
      alert("select your product before trade it");
      return;
    }
    console.log(pSelected);
    if (!$scope.productSelectedOwn) {
      //Proces  the trade
      var data = {"product_req_id": $scope.productSelected.id,
      "product_offer_id": pSelected.id,"active": true, "state": "?",
      "user_id": localStorage.type};
      $scope.createTransfer(data);
    }
    console.log("nope");
  }

  $scope.createTransfer = function(data) {
    $http.post(`http://api.swapingzone.com:3000/transfers?token=${localStorage.token}`, data)
    .then(function successCallback(responce){
      alert("Great! The deal is waiting... you will notify the state of this");
      console.log(responce);
      angular.element('#myModal').modal('hide');
    }, function errorCallback(responce){
      alert("Upps... someting went wrong, try again");
      console.log(responce);
    });
  }

  //Load user transfers
  $scope.loadTransfers = function() {
    $http.get(`http://api.swapingzone.com:3000/transfers?token=${localStorage.token}`)
    .then(function successCallback(responce){
      alert("Great! The deal is waiting... you will notify the state of this");
      console.log(responce);
      angular.element('#myModal').modal('hide');
    }, function errorCallback(responce){
      alert("Upps... someting went wrong, try again");
      console.log(responce);
    });
  }

});
