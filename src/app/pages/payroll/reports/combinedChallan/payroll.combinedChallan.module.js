
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.combinedChallan', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.combinedChallan', {
        url: '/combinedChallan',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/combinedChallan/payroll.combinedChallan.html?v=1',
        controller: "combinedChallanController",
        controllerAs: "payCtrl",
        title: 'Combined Challan',
        sidebarMeta: {
          order: 7,
          parent: 'payroll.reports',
          pageTitle: 'Combined Challan'
        },
      })
  }

})();
