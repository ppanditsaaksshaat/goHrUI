
/**
 * 
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.oddetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.reports.oddetail', {
        url: '/oddetail',
        // abstract: true,
        templateUrl: 'app/pages/attendance/reports/oddetail/attendance.oddetail.html',
        controller: "oddetailController",
        controllerAs: "attCtrl",
        title: 'Out Duty Detail',
        sidebarMeta: {
          order: 5,
          parent: 'attendance.reports',
          pageTitle: 'Out Duty Detail'
        },
      })
  }

})();
