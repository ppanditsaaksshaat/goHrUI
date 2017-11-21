
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.absentreport', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.reports.absentreport', {
        url: '/absentreport',
        // abstract: true,
        templateUrl: 'app/pages/attendance/reports/absentreport/attendance.absentreport.html?v=1',
        controller: "attreportabsentreportController",
        controllerAs: "attCtrl",
        title: 'Absent Detail',
        sidebarMeta: {
          order: 5,
          parent: 'attendance.reports',
          pageTitle: 'Absent Detail'
        },
      })
  }

})();
