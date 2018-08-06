/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.timesheet', [
        'BlurAdmin.pages.configuration.timesheet.costing',
        'BlurAdmin.pages.configuration.timesheet.invoicing'
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.timesheet', {
        url: '/timesheet',
        template: "<top-nav menu=\"'configuration.timesheet'\"></top-nav>",
        //controller: 'companyController',
        title: 'Timesheet',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });

      
    }
  
  })();
  