
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.verified', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.transaction.verified', {
        url: '/verified',
        // abstract: true,
        templateUrl: 'app/pages/attendance/transaction/verified/verified.attendance.html?v=1',
        controller: "attTransVerifiedController",
        controllerAs: "attVerifiedCtrl",
        title: 'Verified Attendance',
        sidebarMeta: {
          order: 5,
          parent: 'attendance.transaction',
          pageTitle: 'attendance verified'
        },
      })
  }

})();
