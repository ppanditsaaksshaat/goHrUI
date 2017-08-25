
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees.list', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.employees.list', {
        url: '/list',
        // abstract: true,
        templateUrl: 'app/pages/organization/employees/list/emp.list.html',
        controller: "emplistController",
        controllerAs: "empCtrl",
        title: 'List',
        sidebarMeta: {
          order: 2,
          parent: 'organization.employees',
          pageTitle: 'Employee List'
        },
      }).state('organization.employees.upload', {
        url: '/upload',
        templateUrl: 'app/pages/organization/employees/upload/empupload.html',
        controller: "OrgEmpUploadController",
        controllerAs: "tabCtrl",
        title: 'Upload Employee',
        sidebarMeta: {
          order: 0,
        },
      });

      //  $urlRouterProvider.when('/organization/employees/masters','/organization/employees/masters/location/34'); 
  }

})();
