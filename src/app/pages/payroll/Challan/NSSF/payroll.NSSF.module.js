
/**
 * @author nitesh
 * created on 11.09.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.Challan.NSSF', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.Challan.NSSF', {
        url: '/NSSF',
        // abstract: true,
        templateUrl: 'app/pages/payroll/Challan/NSSF/payroll.NSSF.html',
        controller: "NSSFController",
        controllerAs: "payCtrl",
        title: 'NSSF',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.Challan',
          pageTitle: 'NSSF'
        },
      })
  }

})();
