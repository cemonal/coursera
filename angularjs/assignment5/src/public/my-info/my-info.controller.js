(function () {
"use strict";

angular.module("public")
.controller("MyInfoController", MyInfoController);

MyInfoController.$inject = ["myInfo","ApiPath"];
function MyInfoController(myInfo,ApiPath) {
  var $ctrl = this;
  $ctrl.registered = !jQuery.isEmptyObject(myInfo)
  $ctrl.info = myInfo;
  $ctrl.basePath = ApiPath;

  console.log(myInfo);
}

})();
