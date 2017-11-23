
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.service.servicecalculation', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.service.servicecalculation', {
        url: '/servicecalculation',
        // abstract: true,
        templateUrl: 'app/pages/payroll/service/servicecalculation/service.servicecalculation.html',
        controller: "serviceCalculationController",
        controllerAs: "",
        title: 'Service Calculation',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.service',
          pageTitle: 'Service'
        },
      })
  }

})();
