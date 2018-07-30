/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.company.locations.location', []).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
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
      }).state('configuration.company.locations.location.modal', {
        abstract: true,
        parent: 'configuration.company.locations.location',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.company.locations.location');
          });
        }]
      }).state('configuration.company.locations.location.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.company.locations.location.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/company/locations/location/edit-location.html',
            controller: 'locationEditController'
          }
        },
        title: 'Edit Location',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.company.locations.location.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.company.locations.location.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/company/locations/location/edit-location.html',
            controller: 'locationEditController'
          }
        },
        title: 'Edit Location',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      });

    $urlRouterProvider.when('/configuration/company/locations', '/configuration/company/locations/location');
  }

})();