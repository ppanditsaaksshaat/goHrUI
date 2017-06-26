/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.pfForm10')
    .controller('pfForm10Controller', pfForm10Controller);

  /** @ngInject */
  function pfForm10Controller($scope) {
    $scope.page = { reportId: 25 }
  }

})();
