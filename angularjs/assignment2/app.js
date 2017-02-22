(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var shoppingList = this;
    shoppingList.items = ShoppingListCheckOffService.getToBuyItems();
    shoppingList.buyItem = function(itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    }
  }

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBoughtList = this;

  alreadyBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItems = [{ 'name': "cookies", quantity: 10 },
  { 'name': "chips", quantity: 5 },
  { 'name': "chocolate", quantity: 7 },
  { 'name': "candy", quantity: 2 },
  { 'name': "popcorn", quantity: 1 }
];

  var alreadyBoughtItems = [];

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getAlreadyBoughtItems = function(){
    return alreadyBoughtItems;
  };

  service.buyItem = function(itemIndex){
    var item =  toBuyItems.splice(itemIndex, 1);
    alreadyBoughtItems.push(item);
  };
}
})();
