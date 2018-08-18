/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.employee.bankbranch', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.employee.bankbranch', {
        url: '/bankbranch',
        templateUrl: 'app/pages/configuration/employees/bankbranch/bankbranch.html',
        controller: 'bankbranchsController',
        title: 'Bank',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 6,
        },
      }).state('configuration.employee.bankbranch.modal', {
        abstract: true,
        parent: 'configuration.employee.bankbranch',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.employee.bankbranch');
          });
        }]
      }).state('configuration.employee.bankbranch.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.employee.bankbranch.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/bankbranch/edit-bankbranch.html',
            controller: 'bankbranchEditController'
          }
        },
        title: 'Edit bankbranch',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.employee.bankbranch.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.employee.bankbranch.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/bankbranch/edit-bankbranch.html',
            controller: 'bankbranchEditController'
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
