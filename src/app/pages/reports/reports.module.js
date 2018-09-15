/**
 * @author N K MISHRA
 * created on 15.09.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.reports', [

  ])

    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('reports', {
        url: '/reports',
        templateUrl: 'app/pages/reports/reports.html',
        controller: "reportController",
        title: 'Reports',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 1,
        },
      }).state('reports.modal', {
        abstract: true,
        parent: 'reports',
        url: '',
        onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
          console.log('Open modal');
          $uibModal.open({
            template: '<div ui-view="modal"></div>',
            size: 'top-center-500'
          }).result.finally(function () {
            // $state.reload();
            $state.go('reports');
          });
        }]
      }).state('reports.attendancedetail', {
        url: '/attendancedetail',
        parent: 'reports.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/reports/list/attendancedetail/attendancedetail.html',
            controller: 'attendanceDetailController',
            resolve: {
              entity: function ($stateParams) {
                return $stateParams.entity;
              }
            }
          }
        },
        title: 'Edit Location',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      }).state('reports.coffdetail', {
        url: '/coffdetail',
        parent: 'reports.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/reports/list/coffdetail/coffdetail.html',
            controller: 'cOffDetailController',
            resolve: {
              entity: function ($stateParams) {
                return $stateParams.entity;
              }
            }
          }
        },
        title: 'Edit Location',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      }).state('reports.fieldduty', {
        url: '/fieldduty',
        parent: 'reports.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/reports/list/fieldduty/fieldduty.html',
            controller: 'fieldDutyController',
            resolve: {
              entity: function ($stateParams) {
                return $stateParams.entity;
              }
            }
          }
        },
        title: 'Edit Location',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      }).state('reports.monthly', {
        url: '/monthly',
        parent: 'reports.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/reports/list/monthly/monthly.html',
            controller: 'monthlyController',
            resolve: {
              entity: function ($stateParams) {
                return $stateParams.entity;
              }
            }
          }
        },
        title: 'Edit Location',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      }).state('reports.device', {
        url: '/device',
        parent: 'reports.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/reports/list/device/device.html',
            controller: 'deviceController',
            resolve: {
              entity: function ($stateParams) {
                return $stateParams.entity;
              }
            }
          }
        },
        title: 'Edit Location',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      }).state('reports.daily', {
        url: '/daily',
        parent: 'reports.modal',
        onEnter: ['$state', function ($state) {
          console.log($state)
        }],
        views: {
          'modal@': {
            templateUrl: 'app/pages/reports/list/daily/daily.html',
            controller: 'dailyController',
            resolve: {
              entity: function ($stateParams) {
                return $stateParams.entity;
              }
            }
          }
        },
        title: 'Edit Location',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
          show: 0
        },
      })

    $urlRouterProvider.when('/reports', '/reports');
  }

})();
