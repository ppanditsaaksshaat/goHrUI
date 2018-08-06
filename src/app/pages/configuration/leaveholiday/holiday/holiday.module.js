/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.leaves.holiday', [
        // 'BlurAdmin.pages.configuration.payroll.payslip.setting'
        
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.leaves.holiday', {
        url: '/holiday',
        templateUrl: 'app/pages/configuration/leaveholiday/holiday/holiday.html',
        //controller: 'companyController',
        title: 'Holiday Configuration',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
    }
  
  })();
  