/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.company.locations.unit', []).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
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
      }).state('configuration.company.locations.unit.modal', {
        abstract: true,
        parent: 'configuration.company.locations.unit',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.company.locations.unit');
          });
        }]
      }).state('configuration.company.locations.unit.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.company.locations.unit.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/company/locations/subUnit/edit-unit.html',
            controller: 'unitEditController'
          }
        },
        title: 'Edit unit',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.company.locations.unit.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.company.locations.unit.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/company/locations/subUnit/edit-unit.html',
            controller: 'unitEditController'
          }
        },
        title: 'Edit Location',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      });

    
  }

})();