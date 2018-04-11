/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.verifyattendance')
    .controller('verifyAttendanceController', verifyAttendanceController);

  /** @ngInject */
  function verifyAttendanceController($scope) {
    $scope.page = { reportId: 67 }
    console.log('verifyAttendanceController')
  }

})();
