
/**
 * 
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.compoffdetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.reports.compoffdetail', {
        url: '/compoffdetail',
        // abstract: true,
        templateUrl: 'app/pages/attendance/reports/compoffdetail/attendance.compoffdetail.html',
        controller: "cOffdetailController",
        controllerAs: "attCtrl",
        title: 'C-Off Detail',
        sidebarMeta: {
          order: 5,
          parent: 'attendance.reports',
          pageTitle: 'C-Off Detail'
        },
      })
  }

})();
