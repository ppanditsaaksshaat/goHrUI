/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.company.locations.branch', []).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.company.locations.branch', {
        url: '/branch',

        templateUrl: 'app/pages/configuration/company/locations/branch/branch.html',
        controller: 'branchController',

        title: 'Branch',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      }).state('configuration.company.locations.branch.modal', {
        abstract: true,
        parent: 'configuration.company.locations.branch',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.company.locations.branch');
          });
        }]
      }).state('configuration.company.locations.branch.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.company.locations.branch.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/company/locations/branch/edit-branch.html',
            controller: 'branchEditController'
          }
        },
        title: 'Edit branch',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.company.locations.branch.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.company.locations.branch.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/company/locations/branch/edit-branch.html',
            controller: 'branchEditController'
          }
        },
        title: 'Add Branch',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      });

    
  }

})();