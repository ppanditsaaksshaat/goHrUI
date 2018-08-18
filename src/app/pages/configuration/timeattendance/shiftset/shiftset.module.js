/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.timeattendance.shiftset', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.timeattendance.shiftset', {
        url: '/shiftset',
        templateUrl: 'app/pages/configuration/timeattendance/shiftset/shiftset.html',
        controller: 'shiftsetController',
        title: 'Shift Set Master',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      }).state('configuration.timeattendance.shiftset.modal', {
        abstract: true,
        parent: 'configuration.timeattendance.shiftset',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.timeattendance.shiftset');
          });
        }]
      }).state('configuration.timeattendance.shiftset.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.timeattendance.shiftset.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/timeattendance/shiftset/edit-shiftset.html',
            controller: 'shiftsetEditController'
          }
        },
        title: 'Edit Holiday',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.timeattendance.shiftset.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.timeattendance.shiftset.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl:  'app/pages/configuration/timeattendance/shiftset/edit-shiftset.html',
            controller: 'shiftsetEditController'
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
