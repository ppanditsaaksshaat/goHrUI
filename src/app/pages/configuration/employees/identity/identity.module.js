/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.employee.identity', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.employee.identity', {
        url: '/identity',
        templateUrl: 'app/pages/configuration/employees/identity/identity.html',
        controller: 'identitysController',
        title: 'Identity',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 10,
        },
      }).state('configuration.employee.identity.modal', {
        abstract: true,
        parent: 'configuration.employee.identity',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.employee.identity');
          });
        }]
      }).state('configuration.employee.identity.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.employee.identity.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/identity/edit-identity.html',
            controller: 'identityEditController'
          }
        },
        title: 'Edit identity',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.employee.identity.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.employee.identity.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/identity/edit-identity.html',
            controller: 'identityEditController'
          }
        },
        title: 'Add Location',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      });
  }

})();
