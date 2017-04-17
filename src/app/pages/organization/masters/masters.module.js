/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.masters', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('organization.masters', {
          url: '/masters',
          abstract: true,
          templateUrl: 'app/pages/organization/masters/masters.html',
          controller: "OrgMastersController",
          controllerAs: "tabCtrl",
          title: 'Master',
          sidebarMeta: {
            order: 0,
          },
        }).state('organization.masters.label', {
          url: '/:label',
          templateUrl: 'app/pages/organization/masters/list/mastersList.html',
          title: 'Mail',
          controller: "OrgMastersListController",
          controllerAs: "listCtrl"
        }).state('organization.masters.detail', {
          url: '/:label/:id',
          templateUrl: 'app/pages/organization/masters/detail/mastersDetail.html',
          title: 'Mail',
          controller: "OrgMastersDetailController",
          controllerAs: "detailCtrl"
        });
    $urlRouterProvider.when('/organization/masters','/organization/masters/inbox');
  }

})();
