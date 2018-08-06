/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.employee.jobprofile', [
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.employee.jobprofile', {
        url: '/jobprofile',
        templateUrl: 'app/pages/configuration/employees/jobprofile/jobprofile.html',
        //controller: 'companyController',
        title: 'Job Profiles',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
      $urlRouterProvider.when('/configuration/employee', '/configuration/employee/jobprofile');
      
    }
  
  })();
  