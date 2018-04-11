
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.paySlips', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.paySlips', {
        url: '/paySlips',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/paySlips/payroll.paySlips.html',
        controller: "paySlipchallanControllers",
        controllerAs: "paySlipCtrl",
        title: 'PaySlip',
        sidebarMeta: {
          order:0,
          parent: 'payroll.reports',
          pageTitle: 'PaySlip'
        },
      })
  }

})();
