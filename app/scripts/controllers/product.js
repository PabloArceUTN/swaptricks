'use strict';

/**
* @ngdoc function
* @name swaptricksApp.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the swaptricksApp
*/
angular.module('swaptricksApp')
.controller('ProductCtrl', function ($scope, $http, $location, $rootScope, Authtoken) {
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
  $scope.myProducts;
  //Selected product Entytie
  $scope.productSelected = {};
  $scope.productSelectedOwn = false;
  $scope.productSelectedDisabled = " ";
  //Loader function
  $scope.loadProducts = function(id) {
    if (!id)
    var url = `http://api.swapingzone.com:3000/products?token=${localStorage.token}`;
    else
    var url = `http://api.swapingzone.com:3000/products?token=${localStorage.token}&user_id=${localStorage.type}`
    $http.get(url)
    .then(function successCallback(response) {
      console.log(response);
      if (!id)
      $scope.items = response.data;
      else
      $scope.myProducts = response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  $scope.deleteProduct = function(product){
    alert("Delete "+ product.id);
    var url = `http://api.swapingzone.com:3000/products/${product.id}?token=${localStorage.token}`;
    $http.delete(url).then(function successCallback(responce){
      alert("Congrats...product deleted :)");
      console.log(responce);
      window.location = "http://localhost:9000/#/myproducts#";
    }, function errorCallback(responce){
      WrongFeedback(responce);
      console.log(responce);
    });
  }
  /////////////////////
  $scope.create = function(product){
    var data = {"name": product.name,
    "description": product.description,
    "user_id": localStorage.type,
    "active": product.active};
    //make the Call
    $http.post(`http://api.swapingzone.com:3000/products?token=${localStorage.token}`, data).then(function successCallback(responce){
      alert("Congrats... now you are create a product :)");
      console.log(responce);
      angular.element('#myModalcreate').modal('hide');
      $scope.loadProducts(true);
    }, function errorCallback(responce){
      // WrongFeedback(responce);
      console.log(responce);
    });
  }
  //////////////////////
  $scope.update = function(product){
    var data = {"name": product.name,
    "description": product.description,
    "active": product.active,
    "user_id": localStorage.type};
    //make the Call
    $http.put(`http://api.swapingzone.com:3000/products/${product.id}?token=${localStorage.token}`, data).then(function successCallback(responce){
      alert("Congrats... now you are update a product :)");
      console.log(responce);
      angular.element('#myModaledit').modal('hide');
      $scope.loadProducts(true);
    }, function errorCallback(responce){
      WrongFeedback(responce);
      console.log(responce);
    });
  }
  ///////////////////////
  //Execute loader function
  $scope.loadProducts(false);
  $scope.loadProducts(true);
  //Set products Entyties
  $scope.setTradeProduct = function(pProduct){
    console.log(pProduct);
    $scope.productSelected = pProduct;
    // $scope.productSelectedImage = pProduct.
    //Can't trade with it self
    if (pProduct.user_id==localStorage.type) {
      $scope.productSelectedOwn = true;
      $scope.productSelectedDisabled = "disabled";
    }else {
      $scope.productSelectedOwn = false;
      $scope.productSelectedDisabled = " ";
    }
  }
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
