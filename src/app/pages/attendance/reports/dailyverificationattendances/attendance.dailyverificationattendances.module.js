
/**
 * 
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.dailyverificationattendances', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.reports.dailyverificationattendances', {
        url: '/dailyverificationattendances',
        // abstract: true,
        templateUrl: 'app/pages/attendance/reports/dailyverificationattendances/attendance.dailyverificationattendances.html',
        controller: "dailyverificationattendanceController",
        controllerAs: "attCtrl",
        title: 'Daily Verify Attendance',
        sidebarMeta: {
          order: 5,
          parent: 'attendance.reports',
          pageTitle: 'Daily Verify Attendance'
        },
      })
  }

})();
