/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.leaves.initial', [
        // 'BlurAdmin.pages.configuration.payroll.payslip.setting'
        
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.leaves.initial', {
        url: '/initial',
        templateUrl: 'app/pages/configuration/leaveholiday/initial/initial.html',
        //controller: 'companyController',
        title: 'Initial Configuration',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
    }
  
  })();
  