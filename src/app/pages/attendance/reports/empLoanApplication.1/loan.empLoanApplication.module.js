
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.reports.empLoanApplication', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('loan.reports.empLoanApplication', {
        url: '/empLoanApplication',
        // abstract: true,
        templateUrl: 'app/pages/loan/reports/empLoanApplication/loan.empLoanApplication.html?v=1',
        controller: "empLoanApplicationController",
        controllerAs: "payCtrl",
        title: 'Loan Application',
        sidebarMeta: {
          order: 1,
          parent: 'loan.reports',
          pageTitle: 'Loan Application'
        },
      })
  }

})();
