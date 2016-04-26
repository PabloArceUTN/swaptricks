'use strict';

/**
* @ngdoc function
* @name swaptricksApp.controller:SessionCtrl
* @description
* # SessionCtrl
* Controller of the swaptricksApp
*/
angular.module('swaptricksApp')
.controller('SessionCtrl', function ($rootScope, $scope, $http, $location) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  // User resgistration
  $scope.create = function(user){
    var data = {"username": user.username,
    "password": user.password,
    "firstname": user.firstname};
    //make the Call
    $http.post('http://api.swapingzone.com:3000/users', data).then(function successCallback(responce){
      alert("Congrats... now you are part of Swapingtricks :)");
      console.log(responce);
      $location.path('/');
    }, function errorCallback(responce){
      WrongFeedback(responce);
      console.log(responce);
    });

  }

  // User login
  $scope.login = function(user){
    var data = {"username": user.username, "password": user.password};
    //make the Call
    $http.post('http://api.swapingzone.com:3000/login', data).then(function successCallback(responce){
      console.log(responce);
      localStorage.token = responce.data.token;
      localStorage.type = responce.data.user;
      window.location = "http://localhost:9000/#/about";
    }, function errorCallback(responce){
      WrongFeedback(responce);
      console.log(responce);
    });
  }

  // User logout
  $scope.logout = function(){
    $http.post('http://api.swapingzone.com:3000/logout', {"token":localStorage.token})
    .then(function successCallback(responce){
      console.log(responce);
      localStorage.token = null;
      localStorage.type = null;
      alert(responce.data.message);
      // $location.path('/');
      // window.location.replace(window.location.href+'?reload');
      window.location = "http://localhost:9000/#/?reload";
    }, function errorCallback(responce){
      WrongFeedback(responce);
      console.log(responce);
    });
  }

  // Execute the bad responce from the errorCallback functions
  function WrongFeedback(responce) {
    if(responce.status == -1 || responce.status == 500){
      alert("Problems... someting went wrong! try again later :(");
    }else{
      if (responce.data.error != undefined){
        alert(responce.data.error);
      }else{
        var errors_stack="";
        for (var insue_sent in responce.data) {
          for (var i = 0; i < responce.data[insue_sent].length; i++)
          errors_stack += insue_sent+" "+responce.data[insue_sent][i]+"\n";
        }
        alert(errors_stack);
      }
    }
  }

});
