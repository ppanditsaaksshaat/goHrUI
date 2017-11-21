
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.reports.empJoiningDt', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.reports.empJoiningDt', {
        url: '/empJoiningDt',
        // abstract: true,
        templateUrl: 'app/pages/organization/reports/empJoiningDt/empJoiningDt.html?v=1',
        controller: "empJoiningDtReportController",
        controllerAs: "payCtrl",
        title: 'Joining Detail',
        sidebarMeta: {
          order:1,
          parent: 'organization.reports',
          pageTitle: 'Joining Detail'
        },
      })
  }

})();
