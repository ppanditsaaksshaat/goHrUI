/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.taxComputation')
    .controller('taxComputationController', taxComputationController);

  /** @ngInject */
  function taxComputationController($scope) {
    $scope.page = { reportId: 64 }
    

  }

})();
