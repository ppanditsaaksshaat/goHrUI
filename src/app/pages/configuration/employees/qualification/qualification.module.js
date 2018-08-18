/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.employee.qualification', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.employee.qualification', {
        url: '/qualification',
        templateUrl: 'app/pages/configuration/employees/qualification/qualification.html',
        controller: 'qualificationsController',
        title: 'Qualif',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 7,
        },
      }).state('configuration.employee.qualification.modal', {
        abstract: true,
        parent: 'configuration.employee.qualification',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.employee.qualification');
          });
        }]
      }).state('configuration.employee.qualification.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.employee.qualification.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/qualification/edit-qualification.html',
            controller: 'qualificationEditController'
          }
        },
        title: 'Edit qualification',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.employee.qualification.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.employee.qualification.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/qualification/edit-qualification.html',
            controller: 'qualificationEditController'
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
