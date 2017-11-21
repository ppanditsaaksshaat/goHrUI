
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.musterMonthWise', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.reports.musterMonthWise', {
        url: '/musterMonthWise',
        // abstract: true,
        templateUrl: 'app/pages/attendance/reports/musterMonthWise/attendance.musterMonthWise.html',
        controller: "musterMonthWiseController",
        controllerAs: "payCtrl",
        title: 'Muster MonthWise',
        sidebarMeta: {
          order: 1,
          parent: 'attendance.reports',
          pageTitle: 'Muster MonthWise'
        },
      })
  }

})();
