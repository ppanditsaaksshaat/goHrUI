/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.expenses', [
      'BlurAdmin.pages.configuration.expenses.policies',
      'BlurAdmin.pages.configuration.expenses.policies'
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.expenses', {
        url: '/expenses',
        template: "<top-nav menu=\"'configuration.expenses'\"></top-nav>",
        //controller: 'companyController',
        title: 'expenses',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
    }
  })();
  