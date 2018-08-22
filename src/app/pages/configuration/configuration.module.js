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
    'BlurAdmin.pages.configuration.timesheet',
    'BlurAdmin.pages.configuration.timeattendance',
    'BlurAdmin.pages.configuration.loanadvance'
  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration', {
        url: '/configuration',
        templateUrl: 'app/pages/configuration/configure.html',
        controller: 'configureController',
        title: 'Configuration',
        onEnter: ['$uibModal', '$state', '$rootScope', 'baSidebarService', function ($uibModal, $state, $rootScope, baSidebarService) {

          if (!baSidebarService.isMenuCollapsed()) {

              baSidebarService.setMenuCollapsed(true);

          }
      }],
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });


  }

})();
