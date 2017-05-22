
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.outdoorapply', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.transaction.outdoorapply', {
        url: '/outdoorapply',
        // abstract: true,
        templateUrl: 'app/pages/attendance/transaction/outdoorapply/attendance.outdoorapply.html?v=1',
        controller: "attTransoutdoorapplyController",
        controllerAs: "attCtrl",
        title: 'OutDoor Apply',
        sidebarMeta: {
          order: 3,
          parent: 'attendance.transaction',
          pageTitle: 'OutDoor Apply'
        },
      })
  }

})();
