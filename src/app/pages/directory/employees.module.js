/**
 * 
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.directory', [
    'BlurAdmin.pages.directory.empdashboard',
    'BlurAdmin.pages.directory.empexist', 
    'BlurAdmin.pages.directory.empdirectory',
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('directory', {
        url: '/directory',
        templateUrl: 'app/pages/directory/employees.html',
       // abstract: true,
        title: 'Directory',
        sidebarMeta: {
          icon: 'ion-pound',
          order: 0,
        },
      });
  }
})();
