/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.company.locations.unit', [
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
      .state('configuration.company.locations.unit', {
        url: '/unit',
        templateUrl: 'app/pages/configuration/company/locations/subUnit/unit.html',
        controller: 'unitController',
        title: 'Unit',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
    }
  
  })();
  