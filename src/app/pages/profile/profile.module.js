/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile', [
    'BlurAdmin.pages.profile.summary'
  ])
    .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('profile', {
        url: '/me',
        templateUrl: 'app/pages/employee/employee.html',
        //abstract: true,
        title: 'Employee',
        controller: "employeeController",
        sidebarMeta: {
          icon: 'ion-pound',
          order: 0,
        },
      });
    //$urlRouterProvider.when('/me', '/me/summary');
  }
})();
