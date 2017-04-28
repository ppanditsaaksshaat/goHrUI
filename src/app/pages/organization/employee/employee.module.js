
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.employee', [])
        .config(routeConfig);
    // angular.module('BlurAdmin.pages.organization.empview', [])
    //     .config(routeConfigEmployeeView);
          angular.module('BlurAdmin.pages.organization.empadd', [])
        .config(routeConfigEmpAdd);
         angular.module('BlurAdmin.pages.organization.empedit', [])
        .config(routeConfigEmpEdit);
        
    /** @ngInject */
    function routeConfig($stateProvider) {     
        $stateProvider
            .state('organization.employee', {
                url: '/employee',
                templateUrl: 'app/pages/organization/employee/employees.html',
                controller: "OrgEmployeesController",
                controllerAs: "listCtrl",
                title: 'Employee List',
                sidebarMeta: {
                    order: 0,
                },
            })
    }
//     function routeConfigEmployeeView($stateProvider,$urlRouterProvider) {
//         $stateProvider
//             .state('organization.empview', {
//                 url: '/employee/:action/:empId',
//                 templateUrl: 'app/pages/organization/employee/detail/employeeDetail.html',
//                 title: 'View Employees',
//                 controller: "OrgEmployeesDetailController",
//                 controllerAs: "detailCtrl"
//             })
//             .state('organization.empview.tab', {
//                 url: '/:name/:pageId',
//                 templateUrl: 'app/pages/organization/employee/detail/empTab.html',
//                 title: 'View Employees',
//                 controller: "OrgEmployeeTabController",
//                 controllerAs: "empTabCtrl"
//             })
            
//       //$urlRouterProvider.when('/organization/employee/view','/organization/view/109');
//    }
   function routeConfigEmpAdd($stateProvider,$urlRouterProvider) {
        $stateProvider

            .state('organization.empadd', {
                url: '/employee/:action',
                templateUrl: 'app/pages/organization/employee/add/employeeAdd.html',
                title: 'Add Employee',
                controller: "AddEmployeeController",
                controllerAs: "addCtrl"
            })
      //$urlRouterProvider.when('/organization/employee/view','/organization/view/109');
   }
    function routeConfigEmpEdit($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('organization.empedit', {
                url: '/employee/:action/:empId',
                templateUrl: 'app/pages/organization/employee/edit/employeeEdit.html',
                title: 'Edit Employee',
                controller: "EditEmployeeController",
                controllerAs: "editCtrl"
            }) .state('organization.empedit.tab', {
                url: '/:name/:pageId',
                templateUrl: 'app/pages/organization/employee/edit/empTab.html',
                title: 'View Employees',
                controller: "OrgEmployeeTabController",
                controllerAs: "empTabCtrl"
            })
      //$urlRouterProvider.when('/organization/employee/view','/organization/view/109');
   }

})();
