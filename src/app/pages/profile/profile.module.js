/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('profile', {
          url: '/',
          template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',        
        //  abstract: true,
          title: 'Me',
          sidebarMeta: {
            icon: 'ion-gear-a',
            order: 2,
          },
        }).state('profile.me', {
          url: '/me',
          templateUrl: 'app/pages/organization/employees/add/employeeAdd.html',
          title: 'Add Employee',
          controller: "AddEmployeeController",
          controllerAs: "addCtrl"
        })

        $urlRouterProvider.when('/profile','/employee');
  }

})();
