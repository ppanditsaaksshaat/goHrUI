
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.compoffapprove', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.transaction.compoffapprove', {
        url: '/compoffapprove',
        // abstract: true,
        templateUrl: 'app/pages/attendance/transaction/compoffapprove/attendance.compoffapprove.html?v=1',
        controller: "attTranscompoffapproveController",
        controllerAs: "attCtrl",
        title: 'Comp Off Detail',
        sidebarMeta: {
          order: 6,
          parent: 'attendance.transaction',
          pageTitle: 'Comp Off Detail'
        },
      })
  }

})();
