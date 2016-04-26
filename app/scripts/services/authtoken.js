angular.module('swaptricksApp')
.factory('Authtoken',function($resource){
  if(localStorage.token==null || localStorage.token == undefined){
    var ptoken = null;
  } else {
    var ptoken = localStorage.token;
  }
  console.log("into service "+localStorage.token);
  return $resource('http://api.swapingzone.com:3000/check?token='+ptoken);
});


// //Execute the http call
// function makeCall() {
//   $http.get(`http://api.swapingzone.com:3000/check?token=${localStorage.token}`)
//   .then(function successCallback(response) {
//     console.log(response);
//     console.log("Correcto");
//     return true;
//   }, function errorCallback(response) {
//     console.log(response);
//     console.log("Error");
//     return false;
//   });
//   return true;
// }
