
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
        }).state('organization.masters.list', {
          url: '/:name/:pageId',
          templateUrl: 'app/pages/organization/masters/list/mastersList.html',
          title: 'Organization Masters',
          controller: "OrgMastersListController",
          controllerAs: "listCtrl"
        }).state('organization.masters.detail', {
          url: '/:pageId/:id',
          templateUrl: 'app/pages/organization/masters/detail/mastersDetail.html',
          title: 'Organization Masters',
          controller: "OrgMastersDetailController",
          controllerAs: "detailCtrl"
        }).state('organization.masters.add', {
          url: '/:name/:action/:pageId/',
          templateUrl: 'app/pages/organization/masters/add/add.html',
          title: 'Organization Masters',
          controller: "OrgMastersAddController",
          controllerAs: "addCtrl"
        }).state('organization.masters.edit', {
          url: '/:name/:action/:pageId/:pkId/',
          templateUrl: 'app/pages/organization/masters/add/add.html',
          title: 'Organization Masters',
          controller: "OrgMastersAddController",
          controllerAs: "addCtrl"
        });
    $urlRouterProvider.when('/organization/masters','/organization/masters/location/34');
  }

})();
