/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.Challan.wcf')
    .controller('wcfController', wcfController);

  /** @ngInject */
  function wcfController($scope) {
    $scope.page = { reportId: 59 }
  }

})();
