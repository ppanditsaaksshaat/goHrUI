
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.otsummarydetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.reports.otsummarydetail', {
        url: '/otsummarydetail',
        // abstract: true,
        templateUrl: 'app/pages/attendance/reports/otsummarydetail/attendance.otsummarydetail.html?v=1',
        controller: "attreportotsummarydetailtController",
        controllerAs: "attCtrl",
        title: 'ot summary detail',
        sidebarMeta: {
          order: 5,
          parent: 'attendance.reports',
          pageTitle: 'ot summary detail'
        },
      })
  }

})();
