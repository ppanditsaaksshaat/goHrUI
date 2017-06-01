
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.masters', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,$urlRouterProvider) {
   
    $stateProvider
        .state('attendance.masters', {
          url: '/masters',
          abstract: true,
          templateUrl: 'app/pages/attendance/masters/masters.html?v=1',
          controller: "attMastersController1",
          controllerAs: "tabCtrl",
          title: 'Master',
          sidebarMeta: {
            order: 0,
          },
        }).state('attendance.masters.list', {
          url: '/:name/:pageId',
          templateUrl: 'app/pages/attendance/masters/list/mastersList.html',
          title: 'attendance Masters',
          controller: "attMastersListController1",
          controllerAs: "listCtrl"
        }).state('attendance.masters.detail', {
          url: '/:pageId/:id',
          templateUrl: 'app/pages/attendance/masters/detail/mastersDetail.html',
          title: 'attendance Masters',
          controller: "attMastersDetailController",
          controllerAs: "detailCtrl"
        }).state('attendance.masters.add', {
          url: '/:name/:action/:pageId/',
          templateUrl: 'app/pages/attendance/masters/add/add.html',
          title: 'attendance Masters',
          controller: "attMastersAddController1",
          controllerAs: "addCtrl"
        }).state('attendance.masters.edit', {
          url: '/:name/:action/:pageId/:pkId/',
          templateUrl: 'app/pages/attendance/masters/add/add.html',
          title: 'attendance Masters',
          controller: "attMastersAddController1",
          controllerAs: "addCtrl"
        });
    $urlRouterProvider.when('/attendance/masters','/attendance/masters/shiftset/289');
  }

})();
