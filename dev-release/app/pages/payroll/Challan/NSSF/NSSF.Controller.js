/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.Challan.NSSF')
    .controller('NSSFController', NSSFController);

  /** @ngInject */
  function NSSFController($scope) {
    $scope.page = { reportId: 53 }
  }

})();
