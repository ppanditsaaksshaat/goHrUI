/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.attendancedetail')
    .controller('attreportattendancedetailController', attreportattendancedetailController);

  /** @ngInject */
  function attreportattendancedetailController($scope) {
    $scope.page = { reportId: 18 }
    console.log('attreportattendancedetailController')
  }

})();
