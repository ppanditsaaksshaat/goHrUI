
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.OnlineECR', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.OnlineECR', {
        url: '/OnlineECR',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/OnlineECR/payroll.OnlineECR.html?v=1',
        controller: "payOnlineECRController",
        controllerAs: "payCtrl",
        title: 'Online ECR',
        sidebarMeta: {
          order: 3,
          parent: 'payroll.reports',
          pageTitle: 'Online ECR'
        },
      })
  }

})();
