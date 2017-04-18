
/**
 * @author deepak jain
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
          controller: "LeaveMastersController",
          controllerAs: "leaveCtrl",
          title: 'Master',
          sidebarMeta: {
            order: 0,
          },
        }).state('leave.masters.label', {
          url: '/:label',
          templateUrl: 'app/pages/leave/masters/list/mastersList.html',
          title: 'Mail',
          controller: "LeaveMastersListController",
          controllerAs: "lmCtrl"
        }).state('leave.masters.detail', {
          url: '/:label/:id',
          templateUrl: 'app/pages/leave/masters/detail/mastersDetail.html',
          title: 'Detail',
          controller: "LeaveMastersDetailController",
          controllerAs: "detailCtrl"
        });
    $urlRouterProvider.when('/leave/masters','/leave/masters/inbox');
  }

})();
