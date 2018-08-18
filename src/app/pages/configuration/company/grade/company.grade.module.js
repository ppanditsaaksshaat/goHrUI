/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.company.grade', []).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.company.grade', {
        url: '/grade',

        templateUrl: 'app/pages/configuration/company/grade/grade.html',
        controller: 'gradeController',

        title: 'grade',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      }).state('configuration.company.grade.modal', {
        abstract: true,
        parent: 'configuration.company.grade',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.company.grade');
          });
        }]
      }).state('configuration.company.grade.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.company.grade.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/company/grade/edit-grade.html',
            controller: 'gradeEditController'
          }
        },
        title: 'Edit unit',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.company.grade.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.company.grade.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/company/grade/edit-grade.html',
            controller: 'gradeEditController'
          }
        },
        title: 'Edit Location',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      });

    
  }

})();