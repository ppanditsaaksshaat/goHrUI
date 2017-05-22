
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.attendancemuster', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.reports.attendancemuster', {
        url: '/attendancemuster',
        // abstract: true,
        templateUrl: 'app/pages/attendance/reports/attendancemuster/attendance.attendancemuster.html?v=1',
        controller: "attreportattendancemusterController",
        controllerAs: "attCtrl",
        title: 'attendance muster',
        sidebarMeta: {
          order: 5,
          parent: 'attendance.reports',
          pageTitle: 'attendance muster'
        },
      })
  }

})();
