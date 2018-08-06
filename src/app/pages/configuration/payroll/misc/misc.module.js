/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.payroll.misc', [
        'BlurAdmin.pages.configuration.payroll.misc.leave',
        'BlurAdmin.pages.configuration.payroll.misc.setting'
        
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.payroll.misc', {
        url: '/misc',
        template: "<child-nav menu=\"'configuration.payroll.misc'\"></child-nav>",
        //controller: 'companyController',
        title: 'Misc',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
    }
  
  })();
  