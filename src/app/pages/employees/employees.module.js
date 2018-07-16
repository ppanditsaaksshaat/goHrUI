/**
 * 
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.employees', [
    'BlurAdmin.pages.employees.empdashboard',
    'BlurAdmin.pages.employees.empexist', 
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('directory', {
        url: '/directory',
        templateUrl: 'app/pages/employees/employees.html',
       // abstract: true,
        title: 'Directory',
        sidebarMeta: {
          icon: 'ion-pound',
          order: 0,
        },
      });
  }
})();
