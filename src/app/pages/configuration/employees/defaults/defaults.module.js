/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.employee.defaults', [
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.employee.defaults', {
        url: '/defaults',
        templateUrl: 'app/pages/configuration/employees/defaults/defaults.html',
        //controller: 'companyController',
        title: 'Default Setting',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });

      
    }
  
  })();
  