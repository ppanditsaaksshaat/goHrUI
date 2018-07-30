/**
 * 
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.self', [
    'BlurAdmin.pages.self.attendance',
    'BlurAdmin.pages.self.apply',
    'BlurAdmin.pages.self.salary',
    'BlurAdmin.pages.self.statement',
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('selfdir', {
        url: '/selfdir',
        templateUrl: 'app/pages/self/self.html',
        // abstract: true,
        title: 'selfdir',
        sidebarMeta: {
          icon: 'ion-pound',
          order: 0,
        },
      });
  }
})();
