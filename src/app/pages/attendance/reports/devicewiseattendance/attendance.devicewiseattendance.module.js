
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.devicewiseattendance', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.reports.devicewiseattendance', {
        url: '/devicewiseattendance',
        // abstract: true,
        templateUrl: 'app/pages/attendance/reports/devicewiseattendance/attendance.devicewiseattendance.html',
        controller: "devicewiseattendanceController",
        controllerAs: "attCtrl",
        title: 'Device Wise Attendance',
        sidebarMeta: {
          order: 5,
          parent: 'attendance.reports',
          pageTitle: 'Device Wise Attendance'
        },
      })
  }

})();
