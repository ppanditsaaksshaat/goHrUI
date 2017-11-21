
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.masters', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,$urlRouterProvider) {
   
    $stateProvider
        .state('leave.masters', {
          url: '/masters',
          abstract: true,
          templateUrl: 'app/pages/leave/masters/masters.html',
          controller: "LeaveMastersController1",
          controllerAs: "tabCtrl",
          title: 'Master',
          sidebarMeta: {
            order: 0,
          },
        }).state('leave.masters.list', {
          url: '/:name/:pageId',
          templateUrl: 'app/pages/leave/masters/list/mastersList.html',
          title: 'leave Masters',
          controller: "LeaveMastersListController1",
          controllerAs: "listCtrl"
        }).state('leave.masters.detail', {
          url: '/:pageId/:id',
          templateUrl: 'app/pages/leave/masters/detail/mastersDetail.html',
          title: 'leave Masters',
          controller: "leaveMastersDetailController",
          controllerAs: "detailCtrl"
        }).state('leave.masters.add', {
          url: '/:name/:action/:pageId/',
          templateUrl: 'app/pages/leave/masters/add/add.html',
          title: 'leave Masters',
          controller: "LeaveMastersAddController1",
          controllerAs: "addCtrl"
        }).state('leave.masters.edit', {
          url: '/:name/:action/:pageId/:pkId/',
          templateUrl: 'app/pages/leave/masters/add/add.html',
          title: 'leave Masters',
          controller: "LeaveMastersAddController1",
          controllerAs: "addCtrl"
        });
    $urlRouterProvider.when('/leave/masters','/leave/masters/leavetype/260');
  }

})();
