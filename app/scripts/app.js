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
      .when('/dashboard', {
        templateUrl: 'views/dash.html',
        controller: 'DashCtrl',
        controllerAs: 'dashboard'
      })
      .when('/myproducts', {
        templateUrl: 'views/myproducts.html',
        controller: 'ProductCtrl',
        controllerAs: 'myproducts'
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
      .otherwise({
        redirectTo: '/'
      });
  });
