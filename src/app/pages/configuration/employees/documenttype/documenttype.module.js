/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.employee.documenttype', [
        'BlurAdmin.pages.configuration.employee.documenttype.list'
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.employee.documenttype', {
        url: '/documenttype',
        templateUrl: 'app/pages/configuration/employees/documenttype/documenttype.html',
        //controller: 'companyController',
        title: 'Document Type',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
      
    }
  
  })();
  