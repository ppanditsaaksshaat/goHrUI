/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.timeattendance.weekoff', [
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.timeattendance.weekoff', {
        url: '/weekoff',
        templateUrl: 'app/pages/configuration/timeattendance/weekoff/weekoff.html',
        //controller: 'companyController',
        title: 'Weekoff Set',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
    }
  })();
  