/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.company.locations.location', [
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
      .state('configuration.company.locations.location', {
        url: '/location',
        templateUrl: 'app/pages/configuration/company/locations/location/location.html',
        controller: 'locationController',
        title: 'Location',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
    }
  
  })();
  