
/**
 * @author nitesh
 * created on 11.09.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.Challan.PPF', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.Challan.PPF', {
        url: '/PPF',
        // abstract: true,
        templateUrl: 'app/pages/payroll/Challan/PPF/payroll.PPF.html',
        controller: "PPFController",
        controllerAs: "payCtrl",
        title: 'PPF',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.Challan',
          pageTitle: 'PPF'
        },
      })
  }

})();
