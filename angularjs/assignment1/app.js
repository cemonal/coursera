(function () {
'use strict';

angular.module('LunchChecker', [])
.controller('LunchCheckerController', LunchCheckerController);

LunchCheckerController.$inject = ['$scope'];

function LunchCheckerController($scope) {
  $scope.message = "";
  $scope.dishes = "";
  $scope.messageClass = "";
  $scope.formGroupClass = "form-group";

  $scope.checkLunch = function () {
    var enteredData = $scope.dishes.split(",");

    var listOfDishes = [];

    for (var i = 0; i < enteredData.length; i++) {
      if(enteredData[i].replace(/\s/g,"") !== "")
        listOfDishes[listOfDishes.length] =  enteredData[i];
    }

    if(listOfDishes.length >= 1 && listOfDishes.length <= 3) {
      $scope.message = "Enjoy!";
      $scope.messageClass = "text-success";
      $scope.formGroupClass = "form-group has-success";
    }
    else if(listOfDishes.length > 3) {
      $scope.message = "Too Much!";
      $scope.messageClass = "text-success";
      $scope.formGroupClass = "form-group has-success";
    }
    else {
      $scope.message = "Please enter data first";
      $scope.messageClass = "text-danger";
      $scope.formGroupClass = "form-group has-warning";
    }
    };
}
})();
