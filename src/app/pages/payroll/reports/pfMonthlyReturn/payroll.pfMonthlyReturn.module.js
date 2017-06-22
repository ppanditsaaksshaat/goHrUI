
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.pfMonthlyReturn', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.pfMonthlyReturn', {
        url: '/pfMonthlyReturn',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/pfMonthlyReturn/payroll.pfMonthlyReturn.html?v=1',
        controller: "pfMonthlyReturnController",
        controllerAs: "payCtrl",
        title: 'PF Monthly Return',
        sidebarMeta: {
          order: 5,
          parent: 'payroll.reports',
          pageTitle: 'PF Monthly Return'
        },
      })
  }

})();
