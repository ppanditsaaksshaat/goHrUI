/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.employee.otherqualification', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.employee.otherqualification', {
        url: '/otherqualification',
        templateUrl: 'app/pages/configuration/employees/otherqualification/otherqualification.html',
        controller: 'otherqualificationsController',
        title: 'Other Qualif',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 8,
        },
      }).state('configuration.employee.otherqualification.modal', {
        abstract: true,
        parent: 'configuration.employee.otherqualification',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.employee.otherqualification');
          });
        }]
      }).state('configuration.employee.otherqualification.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.employee.otherqualification.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/otherqualification/edit-otherqualification.html',
            controller: 'otherqualificationEditController'
          }
        },
        title: 'Edit otherqualification',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.employee.otherqualification.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.employee.otherqualification.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/otherqualification/edit-otherqualification.html',
            controller: 'otherqualificationEditController'
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
