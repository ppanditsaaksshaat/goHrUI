
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.taxComputation', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.taxComputation', {
        url: '/taxComputation',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/taxComputation/payroll.taxComputation.html',
        controller: "taxComputationController",
        controllerAs: "payCtrl",
        title: 'TaxComputation',
        sidebarMeta: {
          order:0,
          parent: 'payroll.reports',
          pageTitle: 'TaxComputation'
        },
      })
  }

})();
