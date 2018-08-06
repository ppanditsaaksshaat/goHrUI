/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.employee.fieldsettings', [
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.employee.fieldsettings', {
        url: '/fieldsettings',
        templateUrl: 'app/pages/configuration/employees/fieldsettings/fieldsettings.html',
        //controller: 'companyController',
        title: 'Field Settings',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
      
    }
  
  })();
  