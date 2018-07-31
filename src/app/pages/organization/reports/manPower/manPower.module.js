
/**
 *
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.reports.manPower', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.reports.manPower', {
        url: '/manPower',
        // abstract: true,
        templateUrl: 'app/pages/organization/reports/manPower/manPower.html',
        controller: "manPowerReportController",
        controllerAs: "payCtrl",
        title: 'Man Power',
        sidebarMeta: {
          order:1,
          parent: 'organization.reports',
          pageTitle: 'Man Power'
        },
      })
  }

})();
