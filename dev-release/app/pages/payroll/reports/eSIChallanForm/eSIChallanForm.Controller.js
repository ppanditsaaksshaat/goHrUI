/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.eSIChallanForm')
    .controller('eSIChallanFormController', eSIChallanFormController);

  /** @ngInject */
  function eSIChallanFormController($scope) {
    $scope.page = { reportId: 28 }
  }

})();
