
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees.masters', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.employees.masters', {
        url: '/masters',
        // abstract: true,
        templateUrl: 'app/pages/organization/employees/masters/emp.masters.html',
        controller: "empMastersController",
        controllerAs: "tabCtrl",
        title: 'Masters',
        sidebarMeta: {
          order: 2,
          parent: 'organization.employees'
        },
      }).state('organization.employees.masters.list', {
        url: '/:name/:pageId',
        templateUrl: 'app/pages/organization/employees/masters/list/mastersList.html',
        title: 'Organization Masters',
        controller: "OrgMastersListController1",
        controllerAs: "listCtrl"
      }).state('organization.employees.masters.add', {
        url: '/:name/:action/:pageId/',
        templateUrl: 'app/pages/organization/employees/masters/add/add.html',
        title: 'Organization Masters',
        controller: "OrgMastersAddController1",
        controllerAs: "addCtrl"
      }).state('organization.employees.masters.edit', {
        url: '/:name/:action/:pageId/:pkId/',
        templateUrl: 'app/pages/organization/employees/masters/add/add.html',
        title: 'Organization Masters',
        controller: "OrgMastersAddController1",
        controllerAs: "addCtrl"
      });
      $urlRouterProvider.when('/organization/employees/masters','/organization/employees/masters/location/34'); 
  }

})();
