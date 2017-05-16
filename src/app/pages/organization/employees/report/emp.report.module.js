
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees.reports', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.employees.reports', {
        url: '/reports',
        // abstract: true,
        templateUrl: 'app/pages/organization/employees/reports/emp.reports.html?v=1',
        controller: "empReportsController",
        controllerAs: "tabCtrl",
        title: 'Reports',
        sidebarMeta: {
          order: 2,
          parent: 'organization.employees'
        },
      })
  }

})();
