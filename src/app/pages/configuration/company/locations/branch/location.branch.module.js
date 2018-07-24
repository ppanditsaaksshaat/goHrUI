/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.company.locations.branch', [
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
      .state('configuration.company.locations.branch', {
        url: '/branch',
        templateUrl: 'app/pages/configuration/company/locations/branch/branch.html',
        controller: 'locationController',
        title: 'Branch',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
    }
  
  })();
  