
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.service.servicedetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.service.servicedetail', {
        url: '/servicedetail',
        // abstract: true,
        templateUrl: 'app/pages/payroll/service/servicedetail/service.servicedetail.html',
        controller: "serviceDetailController",
        controllerAs: "",
        title: 'Service Detail',
        sidebarMeta: {
          order: 1,
          parent: 'payroll.service',
          pageTitle: 'Tax'
        },
      })
  }

})();
