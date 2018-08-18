/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.leaves.leavetype', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.leaves.leavetype', {
        url: '/leavetype',
        templateUrl: 'app/pages/configuration/leaveholiday/leavetype/leavetype.html',
        controller: 'leavetypeController',
        title: 'Leave Type Master',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
      }).state('configuration.leaves.leavetype.modal', {
        abstract: true,
        parent: 'configuration.leaves.leavetype',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.leaves.leavetype');
          });
        }]
      }).state('configuration.leaves.leavetype.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.leaves.leavetype.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/leaveholiday/leavetype/edit-leavetype.html',
            controller: 'leavetypeEditController'
          }
        },
        title: 'Edit Holiday',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.leaves.leavetype.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.leaves.leavetype.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/leaveholiday/leavetype/edit-leavetype.html',
            controller: 'leavetypeEditController'
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
