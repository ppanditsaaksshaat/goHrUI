/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.Challan.PPF')
    .controller('PPFController', PPFController);

  /** @ngInject */
  function PPFController($scope) {
    $scope.page = { reportId: 54 }
  }

})();
