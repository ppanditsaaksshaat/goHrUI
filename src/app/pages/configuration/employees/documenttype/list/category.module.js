/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.employee.documenttype.list', [
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.employee.documenttype.list', {
        url: '/list/:id',
        templateUrl: 'app/pages/configuration/employees/documenttype/list/list.html',
        //controller: 'companyController',
        title: 'Detail',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
    }
  
  })();
  