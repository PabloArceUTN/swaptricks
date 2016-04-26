'use strict';

/**
* @ngdoc function
* @name swaptricksApp.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the swaptricksApp
*/
angular.module('swaptricksApp')
.controller('AboutCtrl', function ($scope, Authtoken, $location, $rootScope) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  $scope.inspectSession =  Authtoken.query(function() {
    console.log('I am done loading products...');
  }, function(error) {
    window.location = "http://localhost:9000/#/?reload";
  });

});
