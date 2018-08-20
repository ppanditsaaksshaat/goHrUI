/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.employee.gender', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.employee.gender', {
        url: '/gender',
        templateUrl: 'app/pages/configuration/employees/gender/gender.html',
        controller: 'gendersController',
        title: 'Gender',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      }).state('configuration.employee.gender.modal', {
        abstract: true,
        parent: 'configuration.employee.gender',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.employee.gender');
          });
        }]
      }).state('configuration.employee.gender.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.employee.gender.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/gender/edit-gender.html',
            controller: 'genderEditController'
          }
        },
        title: 'Edit gender',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.employee.gender.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.employee.gender.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/gender/edit-gender.html',
            controller: 'genderEditController'
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
