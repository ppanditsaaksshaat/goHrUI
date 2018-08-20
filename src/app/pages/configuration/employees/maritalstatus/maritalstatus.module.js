/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.employee.maritalstatus', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.employee.maritalstatus', {
        url: '/maritalstatus',
        templateUrl: 'app/pages/configuration/employees/maritalstatus/maritalstatus.html',
        controller: 'maritalstatussController',
        title: 'Marital',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 2,
        },
      }).state('configuration.employee.maritalstatus.modal', {
        abstract: true,
        parent: 'configuration.employee.maritalstatus',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.employee.maritalstatus');
          });
        }]
      }).state('configuration.employee.maritalstatus.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.employee.maritalstatus.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/maritalstatus/edit-maritalstatus.html',
            controller: 'maritalstatusEditController'
          }
        },
        title: 'Edit maritalstatus',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.employee.maritalstatus.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.employee.maritalstatus.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/maritalstatus/edit-maritalstatus.html',
            controller: 'maritalstatusEditController'
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
