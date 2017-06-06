
/**
 * @author 
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.transaction.loanapplication', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('loan.transaction.loanapplication', {
        url: '/loanapplication',
      //  abstract: true,
        templateUrl: 'app/pages/loan/transaction/loanapplication/loan.loanapplication.html?v=1',
        controller: "LoanAppController",
        controllerAs: "attCtrl",
        title: 'Loan App',
        sidebarMeta: {
          order: 0,
          parent: 'loan.transaction',
          pageTitle: 'Loan App'
        },
      })
  }

})();
