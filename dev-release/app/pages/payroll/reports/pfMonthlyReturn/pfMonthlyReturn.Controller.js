/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.pfMonthlyReturn')
    .controller('pfMonthlyReturnController', pfMonthlyReturnController);

  /** @ngInject */
  function pfMonthlyReturnController($scope) {
    $scope.page = { reportId: 24 }
  }

})();
