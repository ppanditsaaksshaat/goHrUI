
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.reports.leaveDetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('leave.reports.leaveDetail', {
        url: '/leaveDetail',
        // abstract: true,
        templateUrl: 'app/pages/leave/reports/leaveDetail/leave.leaveDetail.html?v=1',
        controller: "leaveDetailController",
        controllerAs: "payCtrl",
        title: 'Leave Detail',
        sidebarMeta: {
          order: 1,
          parent: 'leave.reports',
          pageTitle: 'Leave Detail'
        },
      })
  }

})();
