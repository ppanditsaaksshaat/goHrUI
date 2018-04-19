
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.reports.leaveOutStanding', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('leave.reports.leaveOutStanding', {
        url: '/leaveOutStanding',
        // abstract: true,
        templateUrl: 'app/pages/leave/reports/leaveOutStanding/leaveOutStanding.html',
        controller: "leaveOutStandingController",
        controllerAs: "payCtrl",
        title: 'Out Standing Leave',
        sidebarMeta: {
          order: 1,
          parent: 'leave.reports',
          pageTitle: 'Out Standing Leave'
        },
      })
  }

})();
