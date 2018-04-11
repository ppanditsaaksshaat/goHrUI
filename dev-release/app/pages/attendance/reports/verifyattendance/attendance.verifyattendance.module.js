
/**
 * 
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.verifyattendance', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.reports.verifyattendance', {
        url: '/verifyattendance',
        // abstract: true,
        templateUrl: 'app/pages/attendance/reports/verifyattendance/attendance.verifyattendance.html',
        controller: "verifyAttendanceController",
        controllerAs: "attCtrl",
        title: 'Verify Attendance',
        sidebarMeta: {
          order: 5,
          parent: 'attendance.reports',
          pageTitle: 'Verify Attendance'
        },
      })
  }

})();
