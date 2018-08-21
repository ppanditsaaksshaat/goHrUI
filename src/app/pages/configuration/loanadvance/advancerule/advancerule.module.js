/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.loanadvance.advancerule', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.loanadvance.advancerule', {
        url: '/advancerule',
        templateUrl: 'app/pages/configuration/loanadvance/advancerule/advancerule.html',
        controller: 'advanceruleController',
        title: 'Advance Rule',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 5,
        },
      }).state('configuration.loanadvance.advancerule.modal', {
        abstract: true,
        parent: 'configuration.loanadvance.advancerule',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.loanadvance.advancerule');
          });
        }]
      }).state('configuration.loanadvance.advancerule.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.loanadvance.advancerule.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/loanadvance/advancerule/edit-advancerule.html',
            controller: 'advanceruleEditController'
          }
        },
        title: 'Edit advancerule',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.loanadvance.advancerule.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.loanadvance.advancerule.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/loanadvance/advancerule/edit-advancerule.html',
            controller: 'advanceruleEditController'
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
