
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.FullAndFinalDetailTz', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.transaction.FullAndFinalDetailTz', {
        url: '/FullAndFinalDetailTz',
        // abstract: true,
        templateUrl: 'app/pages/payroll/transaction/FullAndFinalDetailTz/payroll.FullAndFinalDetailTz.html',
        controller: "payFullAndFinalDetailTzController",
        controllerAs: "payCtrl",
        title: 'FullAndFinalDetailTZ',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.transaction',
          pageTitle: 'FullAndFinalDetailTz'
        },
      })
  }

})();
