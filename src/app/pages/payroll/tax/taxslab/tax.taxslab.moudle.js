
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.tax.taxslab', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.tax.taxslab', {
        url: '/taxslab',
        // abstract: true,
        templateUrl: 'app/pages/payroll/tax/taxslab/tax.taxslab.html?v=1',
        controller: "taxSlabController",
        controllerAs: "",
        title: 'Tax Slab',
        sidebarMeta: {
          order: 1,
          parent: 'payroll.tax',
          pageTitle: 'Tax'
        },
      })
  }

})();
