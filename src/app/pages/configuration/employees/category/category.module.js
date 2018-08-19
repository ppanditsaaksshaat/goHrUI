/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.employee.category', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.employee.category', {
        url: '/category',
        templateUrl: 'app/pages/configuration/employees/category/category.html',
        controller: 'categorysController',
        title: 'Category',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 3,
        },
      }).state('configuration.employee.category.modal', {
        abstract: true,
        parent: 'configuration.employee.category',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.employee.category');
          });
        }]
      }).state('configuration.employee.category.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.employee.category.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/category/edit-category.html',
            controller: 'categoryEditController'
          }
        },
        title: 'Edit category',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.employee.category.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.employee.category.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/category/edit-category.html',
            controller: 'categoryEditController'
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
