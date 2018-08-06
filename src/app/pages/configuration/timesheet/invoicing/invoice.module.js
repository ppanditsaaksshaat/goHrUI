/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.timesheet.invoicing', [
        'BlurAdmin.pages.configuration.timesheet.invoicing.general',
        'BlurAdmin.pages.configuration.timesheet.invoicing.taxes',
        'BlurAdmin.pages.configuration.timesheet.invoicing.payment'
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.timesheet.invoicing', {
        url: '/invoicing',
        template: "<child-nav menu=\"'configuration.timesheet.invoicing'\"></child-nav>",
        //controller: 'companyController',
        title: 'invoicing',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });


    }
  
  })();
  