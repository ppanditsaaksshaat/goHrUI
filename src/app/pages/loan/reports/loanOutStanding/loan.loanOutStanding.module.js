
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.reports.loanOutStanding', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('loan.reports.loanOutStanding', {
        url: '/loanOutStanding',
        // abstract: true,
        templateUrl: 'app/pages/loan/reports/loanOutStanding/loan.loanOutStanding.html?v=1',
        controller: "loanOutStandingController",
        controllerAs: "payCtrl",
        title: 'Loan OutStanding',
        sidebarMeta: {
          order: 1,
          parent: 'loan.reports',
          pageTitle: 'Loan OutStanding'
        },
      })
  }

})();
