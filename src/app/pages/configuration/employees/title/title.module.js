/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.employee.title', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.employee.title', {
        url: '/title',
        templateUrl: 'app/pages/configuration/employees/title/title.html',
        controller: 'titlesController',
        title: 'Title',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
      }).state('configuration.employee.title.modal', {
        abstract: true,
        parent: 'configuration.employee.title',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.employee.title');
          });
        }]
      }).state('configuration.employee.title.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.employee.title.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/title/edit-title.html',
            controller: 'titleEditController'
          }
        },
        title: 'Edit title',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.employee.title.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.employee.title.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/title/edit-title.html',
            controller: 'titleEditController'
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
