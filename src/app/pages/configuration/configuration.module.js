/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration', [
    'BlurAdmin.pages.configuration.company'
  ]).config(routeConfig);
      
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
    .state('configuration', {
      url: '/configuration',
      templateUrl: 'app/pages/configuration/configure.html',
      controller: 'configureController',
      title: 'Configuration',
      sidebarMeta: {
        icon: 'ion-android-home',
        order: 1,
      },
    });
  }

})();
