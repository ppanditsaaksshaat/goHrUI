
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.ECREPFDetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.ECREPFDetail', {
        url: '/ECREPFDetail',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/ECREPFDetail/payroll.ECREPFDetail.html',
        controller: "ECREPFDetailController",
        controllerAs: "payCtrl",
        title: 'ECR EPF Detail',
        sidebarMeta: {
          order: 12,
          parent: 'payroll.reports',
          pageTitle: 'ECR EPF Detail'
        },
      })
  }

})();
