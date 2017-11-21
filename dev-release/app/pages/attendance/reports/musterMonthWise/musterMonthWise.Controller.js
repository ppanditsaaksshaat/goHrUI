/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.musterMonthWise')
    .controller('musterMonthWiseController', musterMonthWiseController);

  /** @ngInject */
  function musterMonthWiseController($scope) {
    $scope.page = { reportId: 16 }
  }

})();
