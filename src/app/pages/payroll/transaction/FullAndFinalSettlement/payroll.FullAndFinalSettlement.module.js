
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.FullAndFinalSettlement', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.transaction.FullAndFinalSettlement', {
        url: '/FullAndFinalSettlement',
        // abstract: true,
        templateUrl: 'app/pages/payroll/transaction/FullAndFinalSettlement/payroll.FullAndFinalSettlement.html?v=1',
        controller: "payFullAndFinalSettlementController",
        controllerAs: "payCtrl",
        title: 'FullAndFinalSettlement',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.transaction',
          pageTitle: 'FullAndFinalSettlement'
        },
      })
  }

})();
