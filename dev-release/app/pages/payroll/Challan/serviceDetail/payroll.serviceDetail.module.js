
/**
 * @author nitesh
 * created on 11.09.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.Challan.serviceDetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.Challan.serviceDetail', {
        url: '/serviceDetail',
        // abstract: true,
        templateUrl: 'app/pages/payroll/Challan/serviceDetail/payroll.serviceDetail.html',
        controller: "serviceDetailController",
        controllerAs: "payCtrl",
        title: 'Service Detail',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.Challan',
          pageTitle: 'Service Detail'
        },
      })
  }

})();
