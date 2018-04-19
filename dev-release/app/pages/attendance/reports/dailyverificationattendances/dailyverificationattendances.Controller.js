/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.dailyverificationattendances')
    .controller('dailyverificationattendanceController', dailyverificationattendanceController);

  /** @ngInject */
  function dailyverificationattendanceController($scope) {
    $scope.page = { reportId: 68 }
    console.log('dailyverificationattendanceController')
  }

})();
