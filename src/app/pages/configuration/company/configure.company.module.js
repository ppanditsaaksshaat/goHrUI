/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.company', [
        'BlurAdmin.pages.configuration.company.general',
        'BlurAdmin.pages.configuration.company.legal',
        'BlurAdmin.pages.configuration.company.locations',
        'BlurAdmin.pages.configuration.company.departments',
        'BlurAdmin.pages.configuration.company.designation',
        'BlurAdmin.pages.configuration.company.level',
        'BlurAdmin.pages.configuration.company.grade'
    ]).config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('configuration.company', {
        url: '/company',
        templateUrl: 'app/pages/configuration/company/company.html',
        //controller: 'companyController',
        title: 'Company',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });

      $urlRouterProvider.when('/configuration', '/configuration/company');
    }
  
  })();
  