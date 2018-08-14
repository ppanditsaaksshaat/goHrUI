/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.timeattendance.shiftplan', [
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.timeattendance.shiftplan', {
        url: '/shiftplan',
        templateUrl: 'app/pages/configuration/timeattendance/shiftplan/shiftplan.html',
        //controller: 'companyController',
        title: 'Shift Plan',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
    }
  })();
  