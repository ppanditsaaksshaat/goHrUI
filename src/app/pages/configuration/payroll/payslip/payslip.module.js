/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.payroll.payslip', [
        'BlurAdmin.pages.configuration.payroll.payslip.setting'
        
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.payroll.payslip', {
        url: '/payslip',
        template: "<child-nav menu=\"'configuration.payroll.payslip'\"></child-nav>",
        //controller: 'companyController',
        title: 'Payslip',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
    }
  
  })();
  