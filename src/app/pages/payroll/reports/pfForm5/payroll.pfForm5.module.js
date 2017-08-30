
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.pfForm5', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.pfForm5', {
        url: '/pfForm5',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/pfForm5/payroll.pfForm5.html',
        controller: "pfForm5Controller",
        controllerAs: "payCtrl",
        title: 'PF Form 5',
        sidebarMeta: {
          order: 3,
          parent: 'payroll.reports',
          pageTitle: 'PF Form 5'
        },
      })
  }

})();
