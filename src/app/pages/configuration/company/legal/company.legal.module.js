/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.company.legal', [
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
      .state('configuration.company.legal', {
        url: '/legal',
        templateUrl: 'app/pages/configuration/company/legal/legal.html',
        controller: 'legalController',
        title: 'Legal',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
    }
  
  })();
  