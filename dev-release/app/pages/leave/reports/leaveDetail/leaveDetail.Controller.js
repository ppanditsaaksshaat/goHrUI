/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.reports.leaveDetail')
    .controller('leaveDetailController', leaveDetailController);

  /** @ngInject */
  function leaveDetailController($scope) {
    // $scope.page = { reportId: 49 }
    $scope.page = { reportId: 50 }
  }

})();
