
/**
 * @author deepak jain
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
          templateUrl: 'app/pages/attendance/masters/masters.html',
          controller: "AttendanceMastersController",          
          controllerAs: "attCtrl",
          title: 'Master',
          sidebarMeta: {
            order: 0,
          },
          
        }).state('attendance.masters.label', {
          url: '/:label',
          templateUrl: 'app/pages/attendance/masters/list/masterlist.html',
          title: 'Mail',
          controller: "attendanceMastersListController",
          controllerAs: "attlsCtrl"
        }).state('attendance.masters.detail', {
          url: '/:label/:id',
          templateUrl: 'app/pages/attendance/masters/detail/mastersdetail.html',
          title: 'Detail',
          controller: "AttendanceMastersDetailController",
          controllerAs: "attdetailCtrl"
        });
    $urlRouterProvider.when('/attendance/masters','/attendance/masters/inbox');
  }

})();
