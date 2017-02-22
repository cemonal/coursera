(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', foundItems);

    function foundItems() {
        var ddo = {
            templateUrl: 'listitem.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: NarrowItDownDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }

    function NarrowItDownDirectiveController(){
      var list = this;
      console.log(list);
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var controller = this;
        controller.searchTerm = "";
        controller.founded = [];
        controller.warning = "";
        controller.loading = false;

        controller.getMatchedMenuItems = function() {
            controller.founded = [];
            controller.warning = "";
            console.log(controller);
            if (controller.searchTerm !== "") {
                controller.loading = true;

                var promise = MenuSearchService.getMatchedMenuItems();

                promise.then(function(response) {
                  console.log(response);
                    controller.loading = false;
                    controller.founded = response.data.menu_items.filter(function(a, b) {
                        return a.description.toLowerCase().indexOf(controller.searchTerm.toLowerCase()) > -1
                    });
					
					if(controller.founded.length === 0)
						controller.warning = "Nothing found!";
                }, function(response) {
                    controller.loading = false;
                    controller.warning = response.statusText;
                });
            }
            else {
              controller.warning = "Nothing found!";
            }
        };

        controller.removeItem = function(index) {
		  console.log(index);
          controller.founded.splice(index, 1);

          if(controller.founded.length === 0)
          controller.warning = "Nothing found!";
          else
            controller.warning = "";
        }
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function() {
            var response = $http({
                method: "GET",
                url: ApiBasePath + "/menu_items.json"
            });

            return response;
        }
    }
})();
