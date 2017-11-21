
/**
 * @author nitesh
 * created on 11.09.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.Challan.paye', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.Challan.paye', {
        url: '/paye',
        // abstract: true,
        templateUrl: 'app/pages/payroll/Challan/paye/payroll.paye.html',
        controller: "payeController",
        controllerAs: "payCtrl",
        title: 'PAYE',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.Challan',
          pageTitle: 'PAYE'
        },
      })
  }

})();
