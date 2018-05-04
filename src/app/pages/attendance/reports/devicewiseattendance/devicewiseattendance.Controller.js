/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.devicewiseattendance')
    .controller('devicewiseattendanceController', devicewiseattendanceController);

  /** @ngInject */
  function devicewiseattendanceController($scope) {
    $scope.page = { reportId: 71 }
    console.log('attreportattendancedetailController')
  }

})();
