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
  $scope.items;

  //Loader function
  $scope.loadUser = function() {
    alert("werty");
    var url = `http://api.swapingzone.com:3000/users?token=${localStorage.token}&id=${localStorage.type}`
    $http.get(url)
    .then(function successCallback(response) {
      console.log(response);
      $scope.items = response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  }


  /////////////////////


  //////////////////////
  $scope.updateUser = function(user){
    var data = {
      "username": user.username,
    "firstname": user.firstname,
    "email": user.email,
    "password": user.password
                     };
    //make the Call
    alert("entro");
    $http.put(`http://api.swapingzone.com:3000/users/${localStorage.type}?token=${localStorage.token}`, data).then(function successCallback(responce){
      alert("Congrats... now you are update your credentials :)");
      console.log(responce);


    }, function errorCallback(responce){
      WrongFeedback(responce);
      console.log(responce);
    });
  }

  //Select an especific product

  ///////////////////////
  //Execute loader function

  //Set products Entyties
  function WrongFeedback(responce) {
    if(responce.status == -1 || responce.status == 500){
      alert("Problems... someting went wrong! try again later :(");
    }else{
      if (responce.data.error != undefined){
        alert(responce.data.error);
      }else{
        var errors_stack="";
        var i = 0;
        for (var insue_sent in responce.data) {
          errors_stack += `Thi product can´t be processed. ${responce.data[i].error} \n`;
          i++;
        }
        alert(errors_stack);
      }
    }
  }
});
