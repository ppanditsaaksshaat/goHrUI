/**
 * @author NKM
 * created on 17.08.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.leaves.holidayconfbylocation', [
        // 'BlurAdmin.pages.configuration.payroll.payslip.setting'
        
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.leaves.holidayconfbylocation', {
        url: '/holidayconfbylocation',
        templateUrl: 'app/pages/configuration/leaveholiday/holidayconfbylocation/holidayconfbylocation.html',
        //controller: 'companyController',
        title: 'Holiday Configuration',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 4,
        },
      });
    }
  
  })();
  