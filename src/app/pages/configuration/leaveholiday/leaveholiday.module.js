/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.leaves', [
        'BlurAdmin.pages.configuration.leaves.plan',
        'BlurAdmin.pages.configuration.leaves.initial',
        'BlurAdmin.pages.configuration.leaves.holiday',
        'BlurAdmin.pages.configuration.leaves.holidayconfbylocation',
        // 'BlurAdmin.pages.configuration.leaves.holiday'
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.leaves', {
        url: '/leaves',
        template: "<top-nav menu=\"'configuration.leaves'\"></top-nav>",
        //controller: 'companyController',
        title: 'Leave & Holiday',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });

      
    }
  
  })();
  