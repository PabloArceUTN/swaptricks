'use strict';

/**
* @ngdoc function
* @name swaptricksApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the swaptricksApp
*/
angular.module('swaptricksApp')
.controller('MainCtrl', function ($scope) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  //reload the current page after logout
  if (window.location.href.indexOf('reload') !=-1) {
    window.location.replace("/#/");
    window.location.reload();
  }
});
