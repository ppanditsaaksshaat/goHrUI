
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.test', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.test', {
        url: '/test',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/test/payroll.test.html?v=1',
        controller: "testController",
        controllerAs: "payCtrl",
        title: 'test',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.reports',
          pageTitle: 'test'
        },
      })
  }

})();
