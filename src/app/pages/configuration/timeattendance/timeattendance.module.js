/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.timeattendance', [
      'BlurAdmin.pages.configuration.timeattendance.shiftset',
      'BlurAdmin.pages.configuration.timeattendance.weekoff',
      'BlurAdmin.pages.configuration.timeattendance.rosterplan',
      'BlurAdmin.pages.configuration.timeattendance.shiftdetail',
      
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.timeattendance', {
        url: '/timeattendance',
        template: "<top-nav menu=\"'configuration.timeattendance'\"></top-nav>",
        //controller: 'companyController',
        title: 'timeattendance',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });

      $urlRouterProvider.when('/configuration/timeattendance', '/configuration/timeattendance/shiftset');
    }
  })();
  