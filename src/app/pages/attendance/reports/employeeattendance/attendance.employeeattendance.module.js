
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.employeeattendance', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.reports.employeeattendance', {
        url: '/employeeattendance',
        // abstract: true,
        templateUrl: 'app/pages/attendance/reports/employeeattendance/attendance.employeeattendance.html?v=1',
        controller: "attreportabsentreportController",
        controllerAs: "attCtrl",
        title: 'employee attendance',
        sidebarMeta: {
          order: 5,
          parent: 'attendance.reports',
          pageTitle: 'employee attendance'
        },
      })
  }

})();
