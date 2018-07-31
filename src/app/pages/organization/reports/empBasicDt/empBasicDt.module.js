
/**
 *
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.reports.empBasicDt', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.reports.empBasicDt', {
        url: '/empBasicDt',
        // abstract: true,
        templateUrl: 'app/pages/organization/reports/empBasicDt/empBasicDt.html',
        controller: "empBasicDtReportController",
        controllerAs: "payCtrl",
        title: 'Employee Basic Detail',
        sidebarMeta: {
          order:1,
          parent: 'organization.reports',
          pageTitle: 'Employee Basic Detail'
        },
      })
  }

})();
