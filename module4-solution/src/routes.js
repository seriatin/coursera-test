(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // Premade list page
  .state('categories', {
    url: '/main-categories',
    templateUrl: 'src/templates/main-categories.template.html',
    controller: 'MainCategoriesController as mainCategories',
    resolve: {
      categories: ['MenuDataService', function(MenuDataService) {
        return MenuDataService.getAllCategories()
        .then(function(response) {
          return response.data;
        });
      }]
    }
  })

  .state('items', {
    url: '/main-items/{categoryShortName}',
    templateUrl: 'src/templates/main-items.template.html',
    controller: 'MainItemsController as mainItems',
    resolve: {
      menu_items: ['$stateParams','MenuDataService',
        function($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
            .then(function(response) {
              return response.data;
            }
          );
      }]
    }
  });
}

})();
