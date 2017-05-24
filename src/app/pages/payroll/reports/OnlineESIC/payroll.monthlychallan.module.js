
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.OnlineESIC', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.OnlineESIC', {
        url: '/OnlineESIC',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/OnlineESIC/payroll.OnlineESIC.html?v=1',
        controller: "payOnlineESICController",
        controllerAs: "payCtrl",
        title: 'Online ESIC',
        sidebarMeta: {
          order: 4,
          parent: 'payroll.reports',
          pageTitle: 'Online ESIC'
        },
      })
  }

})();
