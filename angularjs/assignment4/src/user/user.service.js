(function () {
    "use strict";

    angular.module('user')
    .service('UserService', UserService);

    UserService.$inject = ["$q"];
    function UserService($q) {
        var service = this;
        var _info = {};
        var _registered = false;

        service.RegisterUser = function (info) {
            var def = $q.defer();
            _info = info;
            _registered = true;
            def.resolve(_registered);

            return def.promise;
        };

        service.GetUser = function () {
            var def = $q.defer();
            def.resolve(_info);
            return def.promise;
        };

        service.IsRegistered = function () {
            var def = $q.defer();
            def.resolve(_registered);
            return def.promise;
        };
    }
})();
