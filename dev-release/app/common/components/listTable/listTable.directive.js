/**
 * @author deepak.jain
 * created on 06.05.217
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.common.components')
    .directive('listTable', listTable);

  /** @ngInject */
  function listTable($location, $state) {
    return {
      restrict: 'E',
      templateUrl: 'app/common/components/listTable/listTable.html',
      link: function ($scope) {
        $scope.$watch('gridObject.IsAllSelected', function (model) {
          // $scope.activePageTitle = $state.current.title;

        });


        $scope.changeRowSelection = function (row) {
          if (!row.IsRowSelected)
            $scope.gridObject.IsAllSelected = false;
          var selectedRows = $scope.getSelectedRows($scope.rows)
          $scope.IsRowSelected = (selectedRows.length > 0)
        }

        $scope.changeListAll = function () {

          angular.forEach($scope.displayedCollection, function (row) {
            row.IsSelected = $scope.gridObject.IsAllSelected;
          });

          var selectedRows = $scope.getSelectedRows($scope.rows)
          $scope.IsRowSelected = (selectedRows.length > 0)

          if ($scope.gridObject.IsAllSelected) {
            $scope.IsAllIndeterminate = false;
          }
          else if ($scope.IsRowSelected) {
            $scope.IsAllIndeterminate = true;
          }
          else {
            $scope.IsAllIndeterminate = false;
          }

          if ($scope.IsRowSelected) {
            $scope.clearSelection();
          }
        }
      }
    };
  }

})();