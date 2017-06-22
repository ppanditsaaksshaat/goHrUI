
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.pfForm10', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.pfForm10', {
        url: '/pfForm10',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/pfForm10/payroll.pfForm10.html?v=1',
        controller: "pfForm10Controller",
        controllerAs: "payCtrl",
        title: 'PF Form 10',
        sidebarMeta: {
          order: 4,
          parent: 'payroll.reports',
          pageTitle: 'PF Form 10'
        },
      })
  }

})();
