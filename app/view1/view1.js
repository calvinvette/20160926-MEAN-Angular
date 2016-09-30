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

  $scope.workingCustomer = { customerId : -1 }; // = new Customer();
  $scope.isEditing = false;

  $scope.editCustomer = function(cust) {
    $scope.isEditing = true;
    $scope.workingCustomer = angular.copy(cust);
  };

  $scope.showEditing = function(cust) {
    return ($scope.isEditing && ($scope.workingCustomer.customerId == cust.customerId));
  };

  $scope.revertEdit = function(cust) {
    $scope.workingCustomer = { customerId : -1 };
    $scope.isEditing = false;
  };

  $scope.saveEdit = function(cust) {
    angular.extend(cust, $scope.workingCustomer);
    $scope.isEditing = false;
  };

  $scope.keyPress = function(cust, $event) {
    switch($event.keyCode) {
      case 27: // Escape
          $scope.revertEdit(cust);
          break;
      case 13: // Enter
          $scope.saveEdit(cust);
          break;
    }
  };

  $scope.retrieveCustomers = function() {
    $http.get("http://localhost:1701/api/customers").then(
        function(response) {
          $scope.customers = response.data;
          // console.log("Customers found:");
          // console.log($scope.customers);
        },function(response) {
          console.log("Error retrieving customers: " + response.statusText);
        }
    );
  };

  $scope.removeCustomer = function(cust) {
    console.log("Deleting...");
    $http.delete("http://localhost:1701/api/customers/" + cust.customerId).then(
        function(response) {
          console.log("Deleted: ");
          console.log(response.data);
          $scope.customers = [];
          $scope.retrieveCustomers();
        }, function(response) {
          console.log("Error deleting customer: " + response.statusText);
        }
    )
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