
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.pfContribution', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.pfContribution', {
        url: '/pfContribution',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/pfContribution/payroll.pfContribution.html?v=1',
        controller: "pfContributionController",
        controllerAs: "payCtrl",
        title: 'PF Contribution',
        sidebarMeta: {
          order: 8,
          parent: 'payroll.reports',
          pageTitle: 'PF Contribution'
        },
      })
  }

})();
