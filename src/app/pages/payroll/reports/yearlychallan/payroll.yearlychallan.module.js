
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.yearlychallan', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.yearlychallan', {
        url: '/yearlychallan',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/yearlychallan/payroll.yearlychallan.html?v=1',
        controller: "payYearlychallanController",
        controllerAs: "payCtrl",
        title: 'yearlychallan',
        sidebarMeta: {
          order:2,
          parent: 'payroll.reports',
          pageTitle: 'yearlychallan'
        },
      })
  }

})();
