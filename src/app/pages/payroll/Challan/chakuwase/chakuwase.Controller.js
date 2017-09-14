/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.Challan.chakuwase')
    .controller('chakuwaseController', chakuwaseController);

  /** @ngInject */
  function chakuwaseController($scope) {
    $scope.page = { reportId: 55 }
  }

})();
