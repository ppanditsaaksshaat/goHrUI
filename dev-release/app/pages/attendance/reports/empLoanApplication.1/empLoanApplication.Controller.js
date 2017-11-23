/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.reports.empLoanApplication')
    .controller('empLoanApplicationController', empLoanApplicationController);

  /** @ngInject */
  function empLoanApplicationController($scope) {
    $scope.page = { reportId: 15 }
  }

})();
