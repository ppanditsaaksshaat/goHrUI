/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.company.locations', [
      'BlurAdmin.pages.configuration.company.locations.location',
      'BlurAdmin.pages.configuration.company.locations.branch'
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
      .state('configuration.company.locations', {
        url: '/locations',
        templateUrl: 'app/pages/configuration/company/locations/locations.html',
        controller: 'locationsController',
        title: 'Locations',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
    }
  
  })();
  