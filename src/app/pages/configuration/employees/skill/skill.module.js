/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.employee.skill', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.employee.skill', {
        url: '/skill',
        templateUrl: 'app/pages/configuration/employees/skill/skill.html',
        controller: 'skillsController',
        title: 'Skill',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 9,
        },
      }).state('configuration.employee.skill.modal', {
        abstract: true,
        parent: 'configuration.employee.skill',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.employee.skill');
          });
        }]
      }).state('configuration.employee.skill.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.employee.skill.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/skill/edit-skill.html',
            controller: 'skillEditController'
          }
        },
        title: 'Edit skill',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.employee.skill.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.employee.skill.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/employees/skill/edit-skill.html',
            controller: 'skillEditController'
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
