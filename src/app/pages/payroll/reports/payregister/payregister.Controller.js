/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.payregister')
    .controller('payPayregisterController', payPayregisterController);

  /** @ngInject */
  function payPayregisterController($scope) {
    $scope.page = { reportId: 19 }
  }

})();
