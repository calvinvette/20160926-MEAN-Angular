'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http) {
  $scope.firstName = "World";
  $scope.lastName = "";
  $scope.phoneNumber = "";
  $scope.email = "";
  $scope.customerId = 0;

  $scope.customers = [];

  $scope.retrieveCustomers = function() {
    $http.get("http://localhost:1701/api/customers").then(
        function(response) {
          $scope.customers = response.data;
          console.log("Customers found:");
          console.log($scope.customers);
        },function(response) {
          console.log("Error retrieving customers: " + response.statusText);
        }
    );
  };

  $scope.register = function() {
    var customer = {
      firstName : $scope.firstName,
      lastName : $scope.lastName,
      phoneNumber : $scope.phoneNumber,
      email : $scope.email
    };
    $http.post("http://localhost:1701/api/customers", customer).then(
        function(response) { // Success Callback
          console.log("Success");
          var customer = response.data;
          console.log(customer);
          console.log("%s %s registered!",
              customer.firstName,
              customer.lastName
          );
        },
        function(response) { // Error Callback
          console.log("Error posting customer: " + response.statusText);
        }
    );


  }
});