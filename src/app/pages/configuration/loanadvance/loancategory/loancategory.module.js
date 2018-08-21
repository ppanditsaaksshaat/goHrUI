/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.loanadvance.loancategory', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.loanadvance.loancategory', {
        url: '/loancategory',
        templateUrl: 'app/pages/configuration/loanadvance/loancategory/loancategory.html',
        controller: 'loancategoryController',
        title: 'Loan Category Rule',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 3,
        },
      }).state('configuration.loanadvance.loancategory.modal', {
        abstract: true,
        parent: 'configuration.loanadvance.loancategory',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.loanadvance.loancategory');
          });
        }]
      }).state('configuration.loanadvance.loancategory.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.loanadvance.loancategory.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/loanadvance/loancategory/edit-loancategory.html',
            controller: 'loancategoryEditController'
          }
        },
        title: 'Edit loancategory',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.loanadvance.loancategory.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.loanadvance.loancategory.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/loanadvance/loancategory/edit-loancategory.html',
            controller: 'loancategoryEditController'
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
