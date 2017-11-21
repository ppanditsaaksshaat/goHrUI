/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.Challan.wcfHeader')
    .controller('wcfHeaderController', wcfHeaderController);

  /** @ngInject */
  function wcfHeaderController($scope) {
    $scope.page = { reportId: 60 }
  }

})();
