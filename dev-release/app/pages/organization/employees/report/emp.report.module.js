
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees.report', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.employees.report', {
        url: '/reports',
        // abstract: true,
        templateUrl: 'app/pages/organization/employees/report/emp.report.html?v=1',
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
