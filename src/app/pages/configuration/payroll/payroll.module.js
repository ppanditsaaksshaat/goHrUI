/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.payroll', [
        'BlurAdmin.pages.configuration.payroll.setup'
        
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.payroll', {
        url: '/payroll',
        template: "<top-nav menu=\"'configuration.payroll'\"></top-nav>",
        //controller: 'companyController',
        title: 'Payroll',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });

      $urlRouterProvider.when('/configuration/payroll', '/configuration/payroll/setup');
    }
  
  })();
  