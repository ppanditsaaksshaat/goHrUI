/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.payroll.setup', [
        
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.payroll.setup', {
        url: '/setup',
        templateUrl: "app/pages/configuration/payroll/setup/setup.html",
        //controller: 'companyController',
        title: 'Setup',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });

      $urlRouterProvider.when('/configuration', '/configuration/payroll');
    }
  
  })();
  