
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.FullAndFinalDetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.transaction.FullAndFinalDetail', {
        url: '/FullAndFinalDetail',
        // abstract: true,
        templateUrl: 'app/pages/payroll/transaction/FullAndFinalDetail/payroll.FullAndFinalDetail.html?v=1',
        controller: "payFullAndFinalDetailController",
        controllerAs: "payCtrl",
        title: 'FullAndFinalDetail',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.transaction',
          pageTitle: 'FullAndFinalDetail'
        },
      })
  }

})();
