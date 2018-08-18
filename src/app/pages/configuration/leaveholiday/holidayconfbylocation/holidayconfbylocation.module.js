/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.leaves.holidayconfbylocation', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.leaves.holidayconfbylocation', {
        url: '/holidayconfbylocation',
        templateUrl: 'app/pages/configuration/leaveholiday/holidayconfbylocation/holidayconfbylocation.html',
        controller: 'holidayconfbylocationController',
        title: 'Holiday Config By Location',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      }).state('configuration.leaves.holidayconfbylocation.modal', {
        abstract: true,
        parent: 'configuration.leaves.holidayconfbylocation',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.leaves.holidayconfbylocation');
          });
        }]
      }).state('configuration.leaves.holidayconfbylocation.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.leaves.holidayconfbylocation.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/leaveholiday/holidayconfbylocation/edit-holidayconfbylocation.html',
            controller: 'holidayconfbylocationEditController'
          }
        },
        title: 'Edit Holiday Config by location',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.leaves.holidayconfbylocation.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.leaves.holidayconfbylocation.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/leaveholiday/holidayconfbylocation/edit-holidayconfbylocation.html',
            controller: 'holidayconfbylocationEditController'
          }
        },
        title: 'Add Config By Location',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      });
  }

})();
