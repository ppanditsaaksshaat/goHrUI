/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.loanadvance.advancetype', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.loanadvance.advancetype', {
        url: '/advancetype',
        templateUrl: 'app/pages/configuration/loanadvance/advancetype/advancetype.html',
        controller: 'advancetypeController',
        title: 'Advance Type',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 4,
        },
      }).state('configuration.loanadvance.advancetype.modal', {
        abstract: true,
        parent: 'configuration.loanadvance.advancetype',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.loanadvance.advancetype');
          });
        }]
      }).state('configuration.loanadvance.advancetype.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.loanadvance.advancetype.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/loanadvance/advancetype/edit-advancetype.html',
            controller: 'advancetypeEditController'
          }
        },
        title: 'Edit advancetype',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.loanadvance.advancetype.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.loanadvance.advancetype.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/loanadvance/advancetype/edit-advancetype.html',
            controller: 'advancetypeEditController'
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
