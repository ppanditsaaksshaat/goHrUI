
/**
 *
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.reports.monthWiseManPower', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.reports.monthWiseManPower', {
        url: '/monthWiseManPower',
        // abstract: true,
        templateUrl: 'app/pages/organization/reports/monthWiseManPower/monthWiseManPower.html',
        controller: "monthWiseManPowerReportController",
        controllerAs: "payCtrl",
        title: 'Month-Wise Man Power',
        sidebarMeta: {
          order:1,
          parent: 'organization.reports',
          pageTitle: 'Month-Wise Man Power'
        },
      })
  }

})();
