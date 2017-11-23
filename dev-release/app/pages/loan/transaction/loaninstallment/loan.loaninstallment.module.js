
/**
 * @author 
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.transaction.loaninstallment', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('loan.transaction.loaninstallment', {
        url: '/loaninstallment',
      //  abstract: true,
        templateUrl: 'app/pages/loan/transaction/loaninstallment/loan.loaninstallment.html',
        controller: "LoanInstallmentController",
        controllerAs: "attCtrl",
        title: 'Loan Installment',
        sidebarMeta: {
          order: 0,
          parent: 'loan.transaction',
          pageTitle: 'Loan Installment'
        },
      })
  }

})();
