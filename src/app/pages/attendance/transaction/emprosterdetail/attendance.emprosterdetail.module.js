
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.emprosterdetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.transaction.emprosterdetail', {
        url: '/emprosterdetail',
        // abstract: true,
        templateUrl: 'app/pages/attendance/transaction/emprosterdetail/attendance.emprosterdetail.html',
        controller: "emprosterdetailController",
        controllerAs: "attCtrl",
        title: 'Emp Roster Detail',
        sidebarMeta: {
          order: 0,
          parent: 'attendance.transaction',
          pageTitle: 'Emp Roster Detail'
        },
      })
  }

})();
