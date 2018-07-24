/**
 * 
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.employee', [
    'BlurAdmin.pages.employee.empsummary',
    'BlurAdmin.pages.employee.empprofile',
    'BlurAdmin.pages.employee.empjob',
    'BlurAdmin.pages.employee.empdocuments',
    'BlurAdmin.pages.employee.empassets',
    'BlurAdmin.pages.employee.empfinances',
    
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('employee', {
        url: '/:action/:empid',
        templateUrl: 'app/pages/employee/employee.html',
        //abstract: true,
        title: 'Employee',
        controller: "employeeController",
        sidebarMeta: {
          icon: 'ion-pound',
          order: 0,
        },
      });
  }
})();
