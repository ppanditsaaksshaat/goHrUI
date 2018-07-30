/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.company.departments', []).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.company.departments', {
        url: '/departments',

        templateUrl: 'app/pages/configuration/company/departments/depart.html',
        controller: 'departmentsController',

        title: 'Departments',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      }).state('configuration.company.departments.modal', {
        abstract: true,
        parent: 'configuration.company.departments',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.company.departments');
          });
        }]
      }).state('configuration.company.departments.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.company.departments.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/company/departments/depart.html',
            controller: 'departmentsEditController'
          }
        },
        title: 'Edit unit',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.company.departments.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.company.departments.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/company/departments/edit-departments.html',
            controller: 'departmentsEditController'
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