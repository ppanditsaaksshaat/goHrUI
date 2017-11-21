/**
 * @author deepak.jain
 * created on 06.05.217
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.common.components')
    .directive('containerbox', containerbox);

  /** @ngInject */
  function containerbox($location, $state) {
    return {
      restrict: 'E',
      templateUrl: 'app/common/components/containerBox/containerBox.html',
      link: function ($scope) {
        $scope.$watch(function () {
          
        });
      }
    };
  }

})();