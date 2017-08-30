
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.attendancedetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.reports.attendancedetail', {
        url: '/attendancedetail',
        // abstract: true,
        templateUrl: 'app/pages/attendance/reports/attendancedetail/attendance.attendancedetail.html',
        controller: "attreportattendancedetailController",
        controllerAs: "attCtrl",
        title: 'attendance detail',
        sidebarMeta: {
          order: 5,
          parent: 'attendance.reports',
          pageTitle: 'attendance detail'
        },
      })
  }

})();
