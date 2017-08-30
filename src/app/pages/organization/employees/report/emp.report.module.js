
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
<<<<<<< HEAD
        templateUrl: 'app/pages/organization/employees/report/emp.report.html?v=1',
=======
        templateUrl: 'app/pages/organization/employees/report/emp.reports.html',
>>>>>>> 1eefd4014a2c72e07637d385c2b57194f80b510e
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
