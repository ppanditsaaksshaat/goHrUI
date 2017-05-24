
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.monthlychallan', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.monthlychallan', {
        url: '/monthlychallan',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/monthlychallan/payroll.monthlychallan.html?v=1',
        controller: "payMonthlychallanController",
        controllerAs: "payCtrl",
        title: 'monthlychallan',
        sidebarMeta: {
          order:2,
          parent: 'payroll.reports',
          pageTitle: 'monthlychallan'
        },
      })
  }

})();
