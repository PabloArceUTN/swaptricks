'use strict';

/**
* @ngdoc function
* @name swaptricksApp.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the swaptricksApp
*/
angular.module('swaptricksApp')
.controller('UserCtrl', function ($scope, $http, $location, $rootScope, Authtoken) {
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
  $scope.userLoged;

  //Loader function
  $scope.loadUser = function() {
    var url = `http://api.swapingzone.com:3000/users/${localStorage.type}?token=${localStorage.token}`
    $http.get(url)
    .then(function successCallback(response) {
      console.log(response);
      $scope.userLoged = response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  // Update the user information
  $scope.onlyInfo = function(){
    var data = {
      "username": $("#username").val(),
      "firstname": $("#firstname").val(),
      "email": $("#email").val()
    };
    console.log(data);
    $scope.updateUser(data);
  }

  // Update the user information
  $scope.onlyPassword = function(){
    var data = {
      "password": $("#newpassword").val()
    };
    $scope.updateUser(data);
    $("#newpassword").val("");
  }

  //Execute the Update:
  $scope.updateUser = function(data){
    console.log("Print data \n");
    console.log(data);
    //make the Call
    $http.put(`http://api.swapingzone.com:3000/users/${localStorage.type}?token=${localStorage.token}`, data).then(function successCallback(responce){
      alert("Congrats... now you are update your credentials :)");
      console.log(responce);
      angular.element('#myModal').modal('hide');
      $scope.loadUser();
    }, function errorCallback(responce){
      console.log(responce);
      WrongFeedback(responce);
    });
  }

  //Execute loader function
  $scope.loadUser();

  //Set products Entyties
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
  angular.element(document).ready(function () {

  });
});
