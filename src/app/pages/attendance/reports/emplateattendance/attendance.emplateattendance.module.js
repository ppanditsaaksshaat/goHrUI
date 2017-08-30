
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.emplateattendance', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.reports.emplateattendance', {
        url: '/emplateattendance',
        // abstract: true,
        templateUrl: 'app/pages/attendance/reports/emplateattendance/attendance.emplateattendance.html',
        controller: "attreportemplateattendanceController",
        controllerAs: "attCtrl",
        title: 'late attendance',
        sidebarMeta: {
          order: 5,
          parent: 'attendance.reports',
          pageTitle: 'late attendance'
        },
      })
  }

})();
