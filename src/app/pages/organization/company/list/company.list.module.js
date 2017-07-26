
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.company.list', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.company.list', {
        url: '/list',
        // abstract: true,
        templateUrl: 'app/pages/organization/company/list/company.list.html?v=1',
        controller: "companyListController",
        controllerAs: "comCtrl",
        title: 'List',
        sidebarMeta: {
          order: 1,
          parent: 'organization.company',
          pageTitle: 'List'
        },
    })
      // .state('organization.employees.upload', {
    //     url: '/upload',
    //     templateUrl: 'app/pages/organization/employees/upload/empupload.html',
    //     controller: "OrgEmpUploadController",
    //     controllerAs: "tabCtrl",
    //     title: 'Upload Employee',
    //     sidebarMeta: {
    //       order: 0,
    //     },
    //   });

      //  $urlRouterProvider.when('/organization/employees/masters','/organization/employees/masters/location/34'); 
  }

})();
