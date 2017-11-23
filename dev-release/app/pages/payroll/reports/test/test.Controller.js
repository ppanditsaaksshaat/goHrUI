/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.test')
    .controller('testController', testController);

  /** @ngInject */
  function testController($scope) {
    $scope.page = { reportId: 48 }
  }

})();
