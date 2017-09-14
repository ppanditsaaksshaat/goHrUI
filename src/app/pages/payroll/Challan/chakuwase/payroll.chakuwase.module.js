
/**
 * @author nitesh
 * created on 11.09.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.Challan.chakuwase', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.Challan.chakuwase', {
        url: '/chakuwase',
        // abstract: true,
        templateUrl: 'app/pages/payroll/Challan/chakuwase/payroll.chakuwase.html',
        controller: "chakuwaseController",
        controllerAs: "payCtrl",
        title: 'Chakuwase',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.Challan',
          pageTitle: 'Chakuwase'
        },
      })
  }

})();
