/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.me', [
    'BlurAdmin.pages.me.about',
    'BlurAdmin.pages.me.profile',
    'BlurAdmin.pages.me.job'
  ])

    .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('me', {
        url: '/me',
        templateUrl: 'app/pages/employee/employee.html',
        title: 'Me',
        controller: "employeeController",
        sidebarMeta: {
          icon: 'ion-pound',
          order: 0,
        },
      });
  }
})();
