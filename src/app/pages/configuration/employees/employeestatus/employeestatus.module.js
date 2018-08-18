/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.employee.employeestatus', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.employee.employeestatus', {
        url: '/employeestatus',
        templateUrl: 'app/pages/configuration/employees/employeestatus/employeestatus.html',
        controller: 'employeestatussController',
        title: 'Emp Status',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 4,
        },
      }).state('configuration.employee.employeestatus.modal', {
        abstract: true,
        parent: 'configuration.employee.employeestatus',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.employee.employeestatus');
          });
        }]
      }).state('configuration.employee.employeestatus.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.employee.employeestatus.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/employeestatus/edit-employeestatus.html',
            controller: 'employeestatusEditController'
          }
        },
        title: 'Edit employeestatus',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.employee.employeestatus.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.employee.employeestatus.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/employeestatus/edit-employeestatus.html',
            controller: 'employeestatusEditController'
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
