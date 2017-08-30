
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
        templateUrl: 'app/pages/attendance/reports/absentreport/attendance.absentreport.html',
        controller: "attreportabsentreportController",
        controllerAs: "attCtrl",
        title: 'absent report',
        sidebarMeta: {
          order: 5,
          parent: 'attendance.reports',
          pageTitle: 'absent report'
        },
      })
  }

})();
