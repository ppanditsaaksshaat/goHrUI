/**
 * @author NKM
 * created on 21.08.2018
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
        controller: 'weekOffController',
        title: 'Weekoff Set',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 3,
        },
      });
    }
  })();
  