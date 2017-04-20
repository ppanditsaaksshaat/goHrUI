
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
          controllerAs: "tabCtrl",
          title: 'Master',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('leave.masters.label', {
          url: '/:pageId',
          templateUrl: 'app/pages/leave/masters/list/mastersList.html',
          title: 'Leave Master',
          controller: "LeaveMastersListController",
          controllerAs: "lmCtrl"
        });
        // .state('leave.masters.detail', {
        //   url: '/:pageId/:id',
        //   templateUrl: 'app/pages/leave/masters/detail/master.detail.html',
        //   title: 'Detail',
        //   controller: "LeaveMastersDetailController",
        //   controllerAs: "detailCtrl"
        // });
    $urlRouterProvider.when('/leave/masters','/leave/masters/157');
  }

})();


