/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.leaves.plan', [
        
    ]).config(routeConfig); 
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.leaves.plan', {
        url: '/plan',
        templateUrl: 'app/pages/configuration/leaveholiday/plan/plan.html',
        //controller: 'companyController',
        title: 'Leave Plan',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });

      $urlRouterProvider.when('/configuration/leaves', '/configuration/leaves/plan');

    }
  
  })();
  