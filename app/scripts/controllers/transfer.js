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
  $scope.intoTransfers;
  $scope.productOne;
  $scope.productTwo;

  //Load user transfers
  $scope.chargeTransfers = function(pDeal) {
    if(!pDeal)
    var url = `http://api.swapingzone.com:3000/transfers?token=${localStorage.token}`;
    else
    var url = `http://api.swapingzone.com:3000/transfers?token=${localStorage.token}&deal=true`;
    $http.get(url)
    .then(function successCallback(responce){
      console.log(responce);
      if(!pDeal)
      $scope.userTransfers = responce.data;
      else
      $scope.intoTransfers = responce.data;
    }, function errorCallback(responce){
      console.log(responce);
    });
  }
  //Deal: Close the deal!
  $scope.closeDeal = function(trade){
    //make the Call
    var data = {"product_req_id": trade.product_req_id,
    "product_offer_id": trade.product_offer_id,"active": false, "state": "close",
    "user_id": trade.user_id, "product_offer_name": trade.product_offer_name,
    "product_req_name": trade.product_req_name, "to_whom": trade.to_whom};
    console.log(trade.id);
    trade.active = false;
    trade.state = "close";
    console.log(trade);
    $http.put(`http://api.swapingzone.com:3000/transfers/${trade.id}?token=${localStorage.token}`, data)
    .then(function successCallback(responce){
      console.log(responce);
      $scope.chargeTransfers(true);
    }, function errorCallback(responce){
      console.log(responce);
    });
  }

  //TRADE try a new trade!
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
      "user_id": localStorage.type, "product_offer_name":"_",
      "product_req_name": "_", "to_whom": $scope.productSelected.user_id};
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
    var res = confirm("Are you sure?");
    if (res) {
      var url = `http://api.swapingzone.com:3000/transfers/${pTransfer.id}?token=${localStorage.token}`;
      $http.delete(url).then(function successCallback(responce){
        alert("Deal Broken");
        console.log(responce);
        window.location = "http://localhost:9000/#/dashboard#";
      }, function errorCallback(responce){
        alert("Upps... someting went wrong, try again");
      });
    }
  }

  //Execute loadTransfer function
  $scope.chargeTransfers(true);
  $scope.chargeTransfers(false);
});
