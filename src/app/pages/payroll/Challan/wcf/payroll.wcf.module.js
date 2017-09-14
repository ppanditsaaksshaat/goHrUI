
/**
 * @author nitesh
 * created on 11.09.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.Challan.wcf', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.Challan.wcf', {
        url: '/wcf',
        // abstract: true,
        templateUrl: 'app/pages/payroll/Challan/wcf/payroll.wcf.html',
        controller: "wcfController",
        controllerAs: "payCtrl",
        title: 'WCF',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.Challan',
          pageTitle: 'WCF'
        },
      })
  }

})();
