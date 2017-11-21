
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.ECRESIDetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.ECRESIDetail', {
        url: '/ECRESIDetail',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/ECRESIDetail/payroll.ECRESIDetail.html',
        controller: "ECRESIDetailController",
        controllerAs: "payCtrl",
        title: 'ECR ESI Detail',
        sidebarMeta: {
          order: 13,
          parent: 'payroll.reports',
          pageTitle: 'ECR ESI Detail'
        },
      })
  }

})();
