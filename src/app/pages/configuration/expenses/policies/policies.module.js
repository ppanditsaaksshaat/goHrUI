/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.expenses.policies', [
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.expenses.policies', {
        url: '/policies',
        templateUrl: 'app/pages/configuration/expenses/policies/policies.html',
        //controller: 'companyController',
        title: 'Shift Plan',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
    }
  })();
  