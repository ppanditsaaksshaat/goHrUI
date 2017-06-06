
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.manualmonth', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.transaction.manualmonth', {
        url: '/manualmonth',
        // abstract: true,
        templateUrl: 'app/pages/attendance/transaction/manualmonth/attendance.manualmonth.html?v=1',
        controller: "attTransmanualmonthController",
        controllerAs: "attCtrl",
        title: 'Month Att ',
        sidebarMeta: {
          order: 10,
          parent: 'attendance.transaction',
          pageTitle: 'Month Att'
        },
      })
  }

})();
