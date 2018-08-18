/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.employee.retionsheep', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.employee.retionsheep', {
        url: '/retionsheep',
        templateUrl: 'app/pages/configuration/employees/retionsheep/retionsheep.html',
        controller: 'retionsheepsController',
        title: 'Relation',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 5,
        },
      }).state('configuration.employee.retionsheep.modal', {
        abstract: true,
        parent: 'configuration.employee.retionsheep',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.employee.retionsheep');
          });
        }]
      }).state('configuration.employee.retionsheep.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.employee.retionsheep.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/retionsheep/edit-retionsheep.html',
            controller: 'retionsheepEditController'
          }
        },
        title: 'Edit retionsheep',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.employee.retionsheep.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.employee.retionsheep.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/retionsheep/edit-retionsheep.html',
            controller: 'retionsheepEditController'
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
