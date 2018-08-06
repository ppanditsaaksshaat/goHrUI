/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration', [
    'BlurAdmin.pages.configuration.company',
    'BlurAdmin.pages.configuration.payroll',
    'BlurAdmin.pages.configuration.leaves',
    'BlurAdmin.pages.configuration.employee',
    'BlurAdmin.pages.configuration.timesheet'
  ]).config(routeConfig);
      
  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
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
