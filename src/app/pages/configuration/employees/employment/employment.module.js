/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.employee.employment', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.employee.employment', {
        url: '/employment',
        templateUrl: 'app/pages/configuration/employees/employment/employment.html',
        controller: 'employmentsController',
        title: 'Employment',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 3,
        },
      }).state('configuration.employee.employment.modal', {
        abstract: true,
        parent: 'configuration.employee.employment',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.employee.employment');
          });
        }]
      }).state('configuration.employee.employment.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.employee.employment.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/employment/edit-employment.html',
            controller: 'employmentEditController'
          }
        },
        title: 'Edit employment',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.employee.employment.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.employee.employment.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/employment/edit-employment.html',
            controller: 'employmentEditController'
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
