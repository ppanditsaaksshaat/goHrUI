
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.reports.monthlyLeaveDetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('leave.reports.monthlyLeaveDetail', {
        url: '/monthlyLeaveDetail',
        // abstract: true,
        templateUrl: 'app/pages/leave/reports/monthlyLeaveDetail/leave.monthlyLeaveDetail.html?v=1',
        controller: "monthlyLeaveDetailController",
        controllerAs: "payCtrl",
        title: 'Monthly Leave Detail',
        sidebarMeta: {
          order: 1,
          parent: 'leave.reports',
          pageTitle: 'Monthly Leave Detail'
        },
      })
  }

})();
