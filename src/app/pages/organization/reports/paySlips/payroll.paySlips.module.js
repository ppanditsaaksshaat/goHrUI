
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.reports.paySlips', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.reports.paySlips', {
        url: '/paySlips',
        // abstract: true,
        templateUrl: 'app/pages/organization/reports/paySlips/payroll.paySlips.html?v=1',
        controller: "paysSlipchallanController",
        controllerAs: "payCtrl",
        title: 'PaySlip',
        sidebarMeta: {
          order:0,
          parent: 'organization.reports',
          pageTitle: 'PaySlip'
        },
      })
  }

})();
