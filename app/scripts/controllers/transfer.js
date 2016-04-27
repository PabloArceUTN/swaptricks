'use strict';

/**
* @ngdoc function
* @name swaptricksApp.controller:TransferCtrl
* @description
* # TransferCtrl
* Controller of the swaptricksApp
*/
angular.module('swaptricksApp')
.controller('TransferCtrl', function ($scope, $http, $location, $rootScope, Authtoken) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  //AUTHENTICATION Acces
  $scope.inspectSession =  Authtoken.query(function() {
    console.log('Acces');
  }, function(error) {
    window.location = "http://localhost:9000/#/?reload";
  });
  // Trade Entyties
  $scope.userTransfers;

  //Load user transfers
  $scope.chargeTransfers = function() {
    $http.get(`http://api.swapingzone.com:3000/transfers?token=${localStorage.token}`)
    .then(function successCallback(responce){
      console.log(responce);
      $scope.userTransfers = responce.data;
    }, function errorCallback(responce){
      console.log(responce);
    });
  }

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

  // Delete transfer
  $scope.deleteTransfer = function(pTransfer){
    var url = `http://api.swapingzone.com:3000/transfers/${pTransfer.id}?token=${localStorage.token}`;
    $http.delete(url).then(function successCallback(responce){
      alert("Deal Broken");
      console.log(responce);
      window.location = "http://localhost:9000/#/dashboard#";
    }, function errorCallback(responce){
      alert("Upps... someting went wrong, try again");
    });
  }

  //Execute loadTransfer function
  $scope.chargeTransfers();
});
