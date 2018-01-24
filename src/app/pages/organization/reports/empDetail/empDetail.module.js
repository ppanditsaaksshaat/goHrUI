
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.reports.empDetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.reports.empDetail', {
        url: '/empDetail',
        // abstract: true,
        templateUrl: 'app/pages/organization/reports/empDetail/empDetail.html',
        controller: "empDetailReportController",
        controllerAs: "payCtrl",
        title: 'Employee Detail',
        sidebarMeta: {
          order:0,
          parent: 'organization.reports',
          pageTitle: 'Employee Detail'
        },
      })
  }

})();
