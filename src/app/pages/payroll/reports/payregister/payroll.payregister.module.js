
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.payregister', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.payregister', {
        url: '/payregister',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/payregister/payroll.payregister.html?v=1',
        controller: "payPayregisterController",
        controllerAs: "payCtrl",
        title: 'Pay Register',
        sidebarMeta: {
          order: 1,
          parent: 'payroll.reports',
          pageTitle: 'Pay Register'
        },
      })
  }

})();
