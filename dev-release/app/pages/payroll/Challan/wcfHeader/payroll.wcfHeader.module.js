
/**
 * @author nitesh
 * created on 11.09.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.Challan.wcfHeader', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.Challan.wcfHeader', {
        url: '/wcfHeader',
        // abstract: true,
        templateUrl: 'app/pages/payroll/Challan/wcfHeader/payroll.wcfHeader.html',
        controller: "wcfHeaderController",
        controllerAs: "payCtrl",
        title: 'WCF Header',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.Challan',
          pageTitle: 'WCF Header'
        },
      })
  }

})();
