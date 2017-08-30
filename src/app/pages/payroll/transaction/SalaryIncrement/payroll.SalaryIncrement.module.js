
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.SalaryIncrement', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.transaction.SalaryIncrement', {
        url: '/SalaryIncrement',
        // abstract: true,
        templateUrl: 'app/pages/payroll/transaction/SalaryIncrement/payroll.SalaryIncrement.html',
        controller: "paySalaryIncrementController",
        controllerAs: "payCtrl",
        title: 'SalaryIncrement',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.transaction',
          pageTitle: 'SalaryIncrement'
        },
      })
  }

})();
