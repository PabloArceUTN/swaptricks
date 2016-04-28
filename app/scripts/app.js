'use strict';

/**
 * @ngdoc overview
 * @name swaptricksApp
 * @description
 * # swaptricksApp
 *
 * Main module of the application.
 */
angular
  .module('swaptricksApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/registration', {
        templateUrl: 'views/registration.html',
        controller: 'SessionCtrl',
        controllerAs: 'registration'
      })
      .when('/myproducts', {
        templateUrl: 'views/myproducts.html',
        controller: 'ProductCtrl',
        controllerAs: 'myproducts'
      })
      .when('/credentials', {
        templateUrl: 'views/credentials.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'ProductCtrl',
        controllerAs: 'product'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'TransferCtrl',
        controllerAs: 'transfers'
      })

      .when('/deals', {
        templateUrl: 'views/deals.html',
        controller: 'TransferCtrl',
        controllerAs: 'transfers'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
