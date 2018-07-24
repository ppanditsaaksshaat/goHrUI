
/**
 *
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.reports.salaryDetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.reports.salaryDetail', {
        url: '/salaryDetail',
        // abstract: true,
        templateUrl: 'app/pages/organization/reports/salaryDetail/salaryDetail.html',
        controller: "salaryDetailReportController",
        controllerAs: "payCtrl",
        title: 'Salary Detail',
        sidebarMeta: {
          order:1,
          parent: 'organization.reports',
          pageTitle: 'Salary Detail'
        },
      })
  }

})();
