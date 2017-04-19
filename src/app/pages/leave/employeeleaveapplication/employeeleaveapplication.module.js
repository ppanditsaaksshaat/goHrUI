
/**
 * @author deepak jain
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.employeeleaveapplication', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,$urlRouterProvider) {
    $stateProvider
       .state('leave.employeeleaveapplication.label', {
          url: '/:pageId',
          templateUrl: 'app/pages/leave/employeeleaveapplication/list/mastersList.html',
          title: 'Leave Master',
          controller: "LeaveMastersListController",
          controllerAs: "lmCtrl"
        }).state('leave.masters.detail', {
          url: '/:pageId/:id',
          templateUrl: 'app/pages/leave/employeeleaveapplication/detail/master.detail.html',
          title: 'Detail',
          controller: "LeaveMastersDetailController",
          controllerAs: "detailCtrl"
        });
    $urlRouterProvider.when('/leave/employeeleaveapplication','/leave/employeeleaveapplication/157');
  }

})();


