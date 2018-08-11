/**
 * @author deepak.jain
 * created on 28.07.201
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.configuration.company.designation', []).config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('configuration.company.designation', {
          url: '/designation',
  
          templateUrl: 'app/pages/configuration/company/designation/desig.html',
          controller: 'designationController',
  
          title: 'Designation',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 1,
          },
        }).state('configuration.company.designation.modal', {
          abstract: true,
          parent: 'configuration.company.designation',
          url: '',
          onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
            console.log('Open modal');
            $uibModal.open({
              template: '<div ui-view="modal"></div>',
              size: 'top-center-500'
            }).result.finally(function () {
              $state.go('configuration.company.designation');
            });
          }]
        }).state('configuration.company.designation.edit', {
          url: '/edit',
          params: {
            param: null
          },
          parent: 'configuration.company.designation.modal',
          onEnter: ['$state', function ($state) {
            console.log($state)
          }],
          views: {
            'modal@': {
              templateUrl: 'app/pages/configuration/company/designation/edit-designation.html',
              controller: 'desinationEditController'
            }
          },
          title: 'Edit unit',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 1,
            show: 0
          },
        })
        .state('configuration.company.designation.add', {
          url: '/add',
          params: {
            param: null
          },
          parent: 'configuration.company.designation.modal',
          onEnter: ['$state', function ($state) {
            console.log($state)
          }],
          views: {
            'modal@': {
              templateUrl: 'app/pages/configuration/company/designation/edit-designation.html',
              controller: 'desinationEditController'
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