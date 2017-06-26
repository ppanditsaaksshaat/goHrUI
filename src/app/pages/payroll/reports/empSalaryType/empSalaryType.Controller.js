/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.empSalaryType')
    .controller('empSalaryTypeController', empSalaryTypeController);

  /** @ngInject */
  function empSalaryTypeController($scope) {
    $scope.page = { reportId: 21 }
  }

})();
