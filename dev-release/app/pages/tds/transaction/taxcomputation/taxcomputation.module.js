
/**
 * @author nitesh kumar mishra
 * created on 07.12.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tds.transaction.taxcomputation', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('tds.transaction.taxcomputation', {
        url: '/taxcomputation',
        // abstract: true,
        templateUrl: 'app/pages/tds/transaction/taxcomputation/taxcomputation.html',
        controller: "taxcomputationController",
        controllerAs: "payCtrl",
        title: 'Tax Computation',
        sidebarMeta: {
          order: 2,
          parent: 'tds.transaction',
          pageTitle: 'Tax Computation'
        },
      })
  }

})();
