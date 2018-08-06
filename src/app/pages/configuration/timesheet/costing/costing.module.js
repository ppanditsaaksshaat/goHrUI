/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.timesheet.costing', [
        'BlurAdmin.pages.configuration.timesheet.costing.general',
        'BlurAdmin.pages.configuration.timesheet.costing.approval',
        'BlurAdmin.pages.configuration.timesheet.costing.billing'
        
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.timesheet.costing', {
        url: '/costing',
        template: "<child-nav menu=\"'configuration.timesheet.costing'\"></child-nav>",
        //controller: 'companyController',
        title: 'Costing',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });

      $urlRouterProvider.when('/configuration/timesheet', '/configuration/timesheet/costing');

    }
  
  })();
  