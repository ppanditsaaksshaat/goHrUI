/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.loanadvance.loanprovider', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.loanadvance.loanprovider', {
        url: '/loanprovider',
        templateUrl: 'app/pages/configuration/loanadvance/loanprovider/loanprovider.html',
        controller: 'loanproviderController',
        title: 'Loan Provider',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      }).state('configuration.loanadvance.loanprovider.modal', {
        abstract: true,
        parent: 'configuration.loanadvance.loanprovider',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            $state.go('configuration.loanadvance.loanprovider');
          });
        }]
      }).state('configuration.loanadvance.loanprovider.edit', {
        url: '/edit',
        params: {
          param: null
        },
        parent: 'configuration.loanadvance.loanprovider.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/loanadvance/loanprovider/edit-loanprovider.html',
            controller: 'loanproviderEditController'
          }
        },
        title: 'Edit loanprovider',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })
      .state('configuration.loanadvance.loanprovider.add', {
        url: '/add',
        params: {
          param: null
        },
        parent: 'configuration.loanadvance.loanprovider.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/configuration/loanadvance/loanprovider/edit-loanprovider.html',
            controller: 'loanproviderEditController'
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
