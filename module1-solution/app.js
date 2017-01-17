(function() {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', function($scope) {
    $scope.menu = "";
    $scope.isBlankMenu = true;
    $scope.check = function() {
      if ( $scope.menu == "" ) {
        $scope.isBlankMenu = true;
        $scope.message = "Please enter data first";
      } else {
        var menuCnt = countMenuList($scope.menu);
        $scope.isBlankMenu = false;
        if ( menuCnt == 0 ) {
          $scope.message = "";
        } else if ( menuCnt <= 3 ) {
          $scope.message = "Enjoy!";
        } else {
          $scope.message = "Too much!";
        }
      }
    };

    function countMenuList(menu) {
      var menuArr = menu.split(",");
      return menuArr.filter(function(item) {
        return item.trim() != "";
      }).length;
    }
  });
})();
