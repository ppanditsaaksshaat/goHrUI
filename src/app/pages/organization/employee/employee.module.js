
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.employee', [])
        .config(routeConfig);
    angular.module('BlurAdmin.pages.organization.empview', [])
        .config(routeConfigEmpView);
    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('organization.employee', {
                url: '/employee',
                templateUrl: 'app/pages/organization/employee/employees.html',
                controller: "OrgEmployeesController",
                controllerAs: "tabCtrl",
                title: 'Employee',
                sidebarMeta: {
                    order: 0,
                },
            })
    }
    function routeConfigEmpView($stateProvider,$urlRouterProvider) {
        $stateProvider

            .state('organization.empview', {
                url: '/employee/:action/:empId',
                templateUrl: 'app/pages/organization/employee/detail/employeeDetail.html',
                title: 'View Employees',
                controller: "OrgEmployeesDetailController",
                controllerAs: "detailCtrl"
            }).state('organization.empview.tab', {
                url: '/:name/:pageId',
                templateUrl: 'app/pages/organization/employee/detail/empTab.html',
                title: 'View Employees',
                controller: "OrgEmployeeTabController",
                controllerAs: "empTabCtrl"
            });
      //$urlRouterProvider.when('/organization/employee/view','/organization/view/109');
   }

})();
