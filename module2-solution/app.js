(function () {
'use strict';

var toBuyItems = [
  { name: "cookies", quantity: 10 },
  { name: "apples", quantity: 5 },
  { name: "candy", quantity: 7 },
  { name: "Bacon", quantity: 3 },
  { name: "Pancake / Waffle mix", quantity: 2 }
];

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// LIST #1 - controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  // Use factory to create new shopping list service
  // var shoppingList = ShoppingListFactory();

  toBuy.items = ShoppingListCheckOffService.getItems();

  toBuy.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };
}


// LIST #2 - controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;

  // Use factory to create new shopping list service
  // var shoppingList = ShoppingListFactory(3);

  alreadyBought.boughtItems = ShoppingListCheckOffService.getBoughtItems();

}


// If not specified, maxItems assumed unlimited
function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items = toBuyItems;
  var boughtItems = [];
  var message = "";

  service.buyItem = function (itemIndex) {
    var item = items[itemIndex];
    boughtItems.push(item);
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };

  service.getBoughtItems = function() {
    return boughtItems;
  }
}
//
//
// function ShoppingListFactory() {
//   var factory = function (maxItems) {
//     return new ShoppingListService(maxItems);
//   };
//
//   return factory;
// }

})();
