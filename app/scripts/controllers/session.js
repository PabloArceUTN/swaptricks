'use strict';

/**
* @ngdoc function
* @name swaptricksApp.controller:SessionCtrl
* @description
* # SessionCtrl
* Controller of the swaptricksApp
*/
angular.module('swaptricksApp')
.controller('SessionCtrl', function ($scope, $http, $location) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  // User resgistration
  $scope.create = function(user){

    //Compare passwords... TO DO!
    console.log(user);
    var data = {"username": user.username,
    "password": user.password1,
    "firstname": user.firstname};
    //make the Call
    $http.post('http://api.swapingzone.com:3000/users', data).then(function successCallback(responce){
      alert("Congrats... now you are part of Swapingtricks :)");
      console.log(responce);
      $location.path('/');
    }, function errorCallback(responce){
      alert("Someting went wrong! :(");
      console.log(responce);
    });
  }

  // User login
  $scope.login = function(user){

  }

  // User logout
  $scope.logout = function(){

  }

});
