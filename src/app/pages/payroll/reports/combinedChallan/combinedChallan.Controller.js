/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.combinedChallan')
    .controller('combinedChallanController', combinedChallanController);

  /** @ngInject */
  function combinedChallanController($scope) {
    $scope.page = { reportId: 26 }
  }

})();
