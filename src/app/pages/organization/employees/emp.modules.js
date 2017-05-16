/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
  'use strict';

  angular.module('employee', [
    'BlurAdmin.pages.organization.employees.list',
    'BlurAdmin.pages.organization.employees.masters',
    // 'BlurAdmin.pages.organization.employees.report'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('organization.employees', {
        url: '/employees',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Employee',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 100,
        },
      }).state('organization.employees.add', {
        url: '/:action',
        templateUrl: 'app/pages/organization/employees/add/employeeAdd.html',
        title: 'Add Employee',
        controller: "AddEmployeeController",
        controllerAs: "addCtrl"
      }).state('organization.employees.edit', {
        url: '/:action/:empId',
        templateUrl: 'app/pages/organization/employees/edit/employeeEdit.html',
        title: 'Edit Employee',
        controller: "EditEmployeeController",
        controllerAs: "editCtrl"
      }).state('organization.employees.edit.tab', {
        url: '/:name/:pageId',
        templateUrl: 'app/pages/organization/employees/edit/empTab.html',
        title: 'View Employees',
        controller: "OrgEmployeeTabController",
        controllerAs: "empTabCtrl"
      });
  }

})();
