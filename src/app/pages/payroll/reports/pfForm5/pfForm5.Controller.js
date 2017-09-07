/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.pfForm5')
    .controller('pfForm5Controller', pfForm5Controller);

  /** @ngInject */
  function pfForm5Controller($scope) {
    $scope.page = { reportId: 25 }
  }

})();
