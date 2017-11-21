
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.manual', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.transaction.manual', {
        url: '/manual',
        // abstract: true,
        templateUrl: 'app/pages/attendance/transaction/manual/attendance.manual.html',
        controller: "attTransManualController",
        controllerAs: "attCtrl",
        title: 'Day By Attendance',
        sidebarMeta: {
          order: 0,
          parent: 'attendance.transaction',
          pageTitle: 'Day By Attendance'
        },
      })
  }

})();
