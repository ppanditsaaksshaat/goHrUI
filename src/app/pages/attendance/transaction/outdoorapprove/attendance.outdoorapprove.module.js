
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.outdoorapprove', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.transaction.outdoorapprove', {
        url: '/manual',
        // abstract: true,
        templateUrl: 'app/pages/attendance/transaction/outdoorapprove/attendance.outdoorapprove.html?v=1',
        controller: "attTransoutdoorapproveController",
        controllerAs: "attCtrl",
        title: 'OutDoor Detail',
        sidebarMeta: {
          order: 4,
          parent: 'attendance.transaction',
          pageTitle: 'OutDoor Detail'
        },
      })
  }

})();
