
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.SalaryIncrementHistory', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.transaction.SalaryIncrementHistory', {
        url: '/SalaryIncrementHistory',
        // abstract: true,
        templateUrl: 'app/pages/payroll/transaction/SalaryIncrementHistory/payroll.SalaryIncrementHistory.html',
        controller: "paySalaryIncrementHistoryController",
        controllerAs: "payCtrl",
        title: 'SalaryIncrementHistory',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.transaction',
          pageTitle: 'SalaryIncrementHistory'
        },
      })
  }

})();
