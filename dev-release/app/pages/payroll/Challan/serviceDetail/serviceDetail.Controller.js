/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.Challan.serviceDetail')
    .controller('serviceDetailController', serviceDetailController);

  /** @ngInject */
  function serviceDetailController($scope) {
    $scope.page = { reportId: 58 }
  }

})();
