/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.reports.monthlyLeaveDetail')
    .controller('monthlyLeaveDetailController', monthlyLeaveDetailController);

  /** @ngInject */
  function monthlyLeaveDetailController($scope) {
    // $scope.page = { reportId: 49 }
    $scope.page = { reportId: 51 }
  }

})();
