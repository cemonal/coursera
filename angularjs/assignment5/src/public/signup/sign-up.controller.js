(function () {
    "use strict";

    angular.module("public")
    .controller("SignUpController", SignUpController);

    SignUpController.$inject = ["MenuService", "UserService"];
    function SignUpController(MenuService, UserService) {
        var $ctrl = this;
        $ctrl.firstName = "";
        $ctrl.lastName = "";
        $ctrl.email = "";
        $ctrl.phone = "";
        $ctrl.favoriteDishShortNumber = "";
        $ctrl.message = "";
        $ctrl.messageClass = "";

        $ctrl.signUp = function () {
            MenuService.getMenuItemByShortName($ctrl.favoriteDishShortNumber).then(function (response) {
                if (response.length > 0) {
                    UserService.RegisterUser({
                        firstName: $ctrl.firstName,
                        lastName: $ctrl.lastName,
                        email: $ctrl.email,
                        phone: $ctrl.phone,
                        favoriteDish: response[0]
                    }).then(function (t) {
                        $ctrl.messageClass = "alert alert-success";
                        $ctrl.message = "Your information has been saved!";
                    });
                } else {
                    $ctrl.messageClass = "alert alert-warning";
                    $ctrl.message = "No such menu number exists!";
                }
            });
        }
    }
})();