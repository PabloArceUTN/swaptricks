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
    uiTrick(true);
    var data = {"username": user.username,
    "password": user.password,
    "firstname": user.firstname,
    "email": user.email};
    //make the Call
    $http.post('http://api.swapingzone.com:3000/users', data).then(function successCallback(responce){
      alert("Congrats... now you are part of Swapingtricks :)");
      console.log(responce);
      $location.path('/');
      uiTrick(false);
    }, function errorCallback(responce){
      WrongFeedback(responce);
      console.log(responce);
      uiTrick(false);
    });
  }

  // User login
  $scope.login = function(user){
    var data = {"username": user.username, "password": user.password};
    uiTrick(true);
    //make the Call
    $http.post('http://api.swapingzone.com:3000/login', data).then(function successCallback(responce){
      console.log(responce);
      localStorage.token = responce.data.token;
      localStorage.type = responce.data.user;
      window.location = "http://localhost:9000/#/dashboard";
      uiTrick(false);
    }, function errorCallback(responce){
      WrongFeedback(responce);
      console.log(responce);
      uiTrick(false);
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
    if (responce.status == 401) {
      console.log("Unauthorized");
      return;
    }
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

  //Show/Hide & enabled or disabled the action button and the spinner gif
  function uiTrick(init) {
    if (init) {
      $("#logbutton").prop( "disabled", true);
      $("#logbutton").hide();
      $("#abort").hide();
      $("#spin").show();
    }else {
      $("#logbutton").prop( "disabled", false);
      $("#logbutton").show();
      $("#abort").show();
      $("#spin").hide();
    }
  }
});
