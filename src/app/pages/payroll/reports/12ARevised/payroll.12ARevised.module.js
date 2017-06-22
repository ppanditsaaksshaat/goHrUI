
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.12ARevised', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.12ARevised', {
        url: '/12ARevised',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/12ARevised/payroll.12ARevised.html?v=1',
        controller: "tvARevisedController",
        controllerAs: "payCtrl",
        title: '12A Revised',
        sidebarMeta: {
          order: 6,
          parent: 'payroll.reports',
          pageTitle: '12A Revised'
        },
      })
  }

})();
