(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('MainItemsController', MainItemsController);

  MainItemsController.$inject = ['menu_items'];
  function MainItemsController(menu_items) {
    var mainItems = this;
    mainItems.category = menu_items.category;
    mainItems.items = menu_items.menu_items;
  }


})();
