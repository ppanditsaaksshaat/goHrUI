
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.general.orgchart', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.general.orgchart', {
        url: '/orgchart',
        // abstract: true,
        templateUrl: 'app/pages/organization/general/orgchart/orgchart.html?v=1',
        controller: "orgchartController",
        controllerAs: "tabCtrl",
        title: 'Organization Chart',
        sidebarMeta: {
          order: 3,
          parent: 'organization.general'
        },
      })
    //  $urlRouterProvider.when('/organization/masters','/organization/masters/location/34');
  }

})();
