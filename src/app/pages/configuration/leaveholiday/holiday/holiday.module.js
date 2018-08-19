/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.leaves.holiday', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.leaves.holiday', {
        url: '/holiday',
        templateUrl: 'app/pages/configuration/leaveholiday/holiday/holiday.html',
        controller: 'holidayController',
        title: 'Holiday Master',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      }).state('configuration.leaves.holiday.modal', {
        abstract: true,
        parent: 'configuration.leaves.holiday',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.leaves.holiday');
          });
        }]
      }).state('configuration.leaves.holiday.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.leaves.holiday.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/leaveholiday/holiday/edit-holiday.html',
            controller: 'holidayEditController'
          }
        },
        title: 'Edit Holiday',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.leaves.holiday.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.leaves.holiday.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/leaveholiday/holiday/edit-holiday.html',
            controller: 'holidayEditController'
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
