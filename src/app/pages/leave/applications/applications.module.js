
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
          controller: "LeaveApplicationController",
          controllerAs: "leaveApCtrl",
          title: 'Application',
          sidebarMeta: {
            order: 0,
          },
        }).state('leave.applications.label', {
          url: '/:label',
          templateUrl: 'app/pages/leave/applications/list/applicationslist.html',
          title: 'Mail',
          controller: "LeaveApplicationListController",
          controllerAs: "lmAppLtCtrl"
        }).state('leave.applications.detail', {
          url: '/:label/:id',
          templateUrl: 'app/pages/leave/applications/detail/applicationsdetail.html',
          title: 'Detail',
          controller: "LeaveApplicationsDetailController",
          controllerAs: "leaveDetailCtrl"
        });
    $urlRouterProvider.when('/leave/applications','/leave/applications/inbox');
  }

})();
