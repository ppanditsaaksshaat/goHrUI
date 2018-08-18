/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.company.level', []).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.company.level', {
        url: '/level',

        templateUrl: 'app/pages/configuration/company/level/level.html',
        controller: 'levelController',

        title: 'Level',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      }).state('configuration.company.level.modal', {
        abstract: true,
        parent: 'configuration.company.level',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.company.level');
          });
        }]
      }).state('configuration.company.level.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.company.level.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/company/level/edit-level.html',
            controller: 'levelEditController'
          }
        },
        title: 'Edit unit',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.company.level.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.company.level.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/company/level/edit-level.html',
            controller: 'levelEditController'
          }
        },
        title: 'Edit Level',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      });

    
  }

})();