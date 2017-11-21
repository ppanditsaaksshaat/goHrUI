
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.manualmonthlyatt', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.transaction.manualmonthlyatt', {
        url: '/manualmonthlyatt',
        // abstract: true,
        templateUrl: 'app/pages/attendance/transaction/manualmonthlyatt/attendance.manualmonthlyatt.html',
        controller: "manualmonthlyattController",
        controllerAs: "attCtrl",
        title: 'Manual Attendance',
        sidebarMeta: {
          order: 0,
          parent: 'attendance.transaction',
          pageTitle: 'Manual Attendance'
        },
      })
  }

})();
