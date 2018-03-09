
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.dailysummary', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.transaction.dailysummary', {
        url: '/dailysummary',
        // abstract: true,
        templateUrl: 'app/pages/attendance/transaction/dailysummary/attendance.dailysummary.html',
        controller: "attDailySummaryController",
        controllerAs: "attCtrl",
        title: 'Daily Summary',
        sidebarMeta: {
          order: 0,
          parent: 'attendance.transaction',
          pageTitle: 'Daily Summary'
        },
      })
  }

})();
