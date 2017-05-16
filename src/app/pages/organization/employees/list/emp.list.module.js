
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
        templateUrl: 'app/pages/organization/employees/list/emp.list.html?v=1',
        controller: "emplistController",
        controllerAs: "empCtrl",
        title: 'List',
        sidebarMeta: {
          order: 2,
          parent: 'organization.employees',
          pageTitle: 'Employee List'
        },
      })
  }

})();
