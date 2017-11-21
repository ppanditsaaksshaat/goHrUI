
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.eSIChallanForm', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.eSIChallanForm', {
        url: '/eSIChallanForm',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/eSIChallanForm/payroll.eSIChallanForm.html',
        controller: "eSIChallanFormController",
        controllerAs: "payCtrl",
        title: 'ESI ChallanForm',
        sidebarMeta: {
          order: 9,
          parent: 'payroll.reports',
          pageTitle: 'ESI ChallanForm'
        },
      })
  }

})();
