/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.loanadvance.loantype', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.loanadvance.loantype', {
        url: '/loantype',
        templateUrl: 'app/pages/configuration/loanadvance/loantype/loantype.html',
        controller: 'loantypeController',
        title: 'Loan Type',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 2,
        },
      }).state('configuration.loanadvance.loantype.modal', {
        abstract: true,
        parent: 'configuration.loanadvance.loantype',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.loanadvance.loantype');
          });
        }]
      }).state('configuration.loanadvance.loantype.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.loanadvance.loantype.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/loanadvance/loantype/edit-loantype.html',
            controller: 'loantypeEditController'
          }
        },
        title: 'Edit loantype',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.loanadvance.loantype.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.loanadvance.loantype.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/loanadvance/loantype/edit-loantype.html',
            controller: 'loantypeEditController'
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
