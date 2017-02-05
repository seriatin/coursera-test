(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

  function FoundItemsDirective() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      scope: {
        foundItems: '<',
        onRemove: '&',
        notFoundMsg: '<'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'items',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var items = this;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {

    var narrowItDown = this;
    narrowItDown.searchTerm = '';
    narrowItDown.found = [];
    narrowItDown.notFoundMsg = null;

    narrowItDown.getMatchedMenuItems = function() {
      var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);
      promise.then(function(foundItems) {
        if ( foundItems.length == 0 ) {
          narrowItDown.notFoundMsg = 'Nothing Found!';
        } else {
          narrowItDown.notFoundMsg = null;
        }
        narrowItDown.found = foundItems;
      })
      .catch(function(error) {
        console.log(error);
      });

    }

    narrowItDown.removeItem = function(index) {
      narrowItDown.found.splice(index, 1);
    }

  }





  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {

    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: 'GET',
        url: ApiBasePath + '/menu_items.json'
      })
      .then(function(result) {
        var foundItems = result.data.menu_items.filter(function(arg) {
          return (arg.description.indexOf(searchTerm) != -1);
        });
        return foundItems;
      });
    }

  }

})();
