
/**
 * @author nitesh
 * created on 11.09.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.Challan.chowdau', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.Challan.chowdau', {
        url: '/chowdau',
        // abstract: true,
        templateUrl: 'app/pages/payroll/Challan/chowdau/payroll.chowdau.html',
        controller: "chowdauController",
        controllerAs: "payCtrl",
        title: 'Chowdau',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.Challan',
          pageTitle: 'Chowdau'
        },
      })
  }

})();
