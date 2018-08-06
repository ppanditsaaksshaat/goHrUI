/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.employee', [
        'BlurAdmin.pages.configuration.employee.jobprofile',
        'BlurAdmin.pages.configuration.employee.defaults',
        'BlurAdmin.pages.configuration.employee.fieldsettings',
        'BlurAdmin.pages.configuration.employee.documenttype'
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.employee', {
        url: '/employee',
        template: "<top-nav menu=\"'configuration.employee'\"></top-nav>",
        //controller: 'companyController',
        title: 'Leave & Holiday',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });

      
    }
  
  })();
  