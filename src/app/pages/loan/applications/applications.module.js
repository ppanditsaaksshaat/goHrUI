
/**
 * @author deepak jain
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.applications', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('leave.applications', {
          url: '/applications',
          abstract: true,
          templateUrl: 'app/pages/leave/applications/applications.html',
          controller: "ApplicationsMastersController",
          controllerAs: "tabCtrls",
          title: 'Application',
          sidebarMeta: {
            order: 0,
          },
        }).state('leave.applications.label', {
          url: '/:pageId',
          templateUrl: 'app/pages/leave/applications/list/applicationslist.html',
          title: 'Leave Application',
          controller: "ApplicationsMastersListController",
          controllerAs: "lmCtrls"
        }).state('leave.applications.detail', {
          url: '/:pageId/:id',
          templateUrl: 'app/pages/leave/masters/detail/applicationsdetail.html',
          title: 'Detail',
          controller: "ApplicationsMastersDetailController",
          controllerAs: "detailCtrls"
        });
    $urlRouterProvider.when('/leave/masters','/leave/masters');
  }

})();


