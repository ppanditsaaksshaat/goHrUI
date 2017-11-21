/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.reports.empDetail')
    .controller('empDetailReportController', empDetailReportController);

  /** @ngInject */
  function empDetailReportController($scope) {
    $scope.page = { reportId: 8 }

    // function empLoanDetailController($scope) {
    //   $scope.page = { reportId: 10 }

  }

})();
