/**
 * 
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.directory', [
    'BlurAdmin.pages.directory.empdashboard',
    'BlurAdmin.pages.directory.employees',
    'BlurAdmin.pages.directory.empdirectory',
    'BlurAdmin.pages.directory.empanalytics',
    // 'BlurAdmin.pages.directory.empexist',
    'BlurAdmin.pages.directory.searchlist',
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('directory', {
        url: '/directory',
        templateUrl: 'app/pages/directory/directory.html',
        // abstract: true,
        title: 'Directory',
        controller: "directoryController",
        sidebarMeta: {
          icon: 'ion-pound',
          order: 0,
        },
      });
  }
})();
