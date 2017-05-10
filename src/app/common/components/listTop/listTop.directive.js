/**
 * @author deepak.jain
 * created on 06.05.217
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.common.components')
    .directive('listTop', listTop);

  /** @ngInject */
  function listTop($location, $state) {
    return {
      restrict: 'E',
      templateUrl: 'app/common/components/listTop/listTop.html',
      link: function ($scope) {
        // $scope.$watch(function () {
        //   $scope.activePageTitle = $state.current.title;
        //   // $scope.IsRowSelected = $scope.gridObject.IsRowsSelected;
        // });
      }
    };
  }

})();