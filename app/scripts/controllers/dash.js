'use strict';

/**
* @ngdoc function
* @name swaptricksApp.controller:DashCtrl
* @description this is the user's dashboard
* # DashCtrl
* Controller of the swaptricksApp
*/
angular.module('swaptricksApp')
.controller('DashCtrl', function ($scope, $http, Authtoken) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  //TRADE!
  //AUTHENTICATION Acces
  $scope.inspectSession =  Authtoken.query(function() {
    console.log('Acces');
  }, function(error) {
    console.log(error);
    window.location = "http://localhost:9000/#/?reload";
  });
});
