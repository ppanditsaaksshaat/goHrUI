
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.employee', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('organization.employee', {
                url: '/employee',
                abstract: true,
                templateUrl: 'app/pages/organization/employee/employees.html',
                controller: "OrgEmployeesController",
                controllerAs: "tabCtrl",
                title: 'Employee',
                sidebarMeta: {
                    order: 0,
                },
            })
            .state('organization.employee.list', {
                url: '/:pageId',
                templateUrl: 'app/pages/organization/employee/list/employeeList.html',
                title: 'Organization Employees',
                controller: "OrgEmployeesListController",
                controllerAs: "listCtrl"
            }).state('organization.employee.detail', {
                url: '/:pageId/:id',
                templateUrl: 'app/pages/organization/employee/detail/employeeDetail.html',
                title: 'Organization Employees',
                controller: "OrgEmployeeDetailController",
                controllerAs: "detailCtrl"
            });
        $urlRouterProvider.when('/organization/employee', '/organization/employee/25');
    }

})();
