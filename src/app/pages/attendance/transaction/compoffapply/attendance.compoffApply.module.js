
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.compoffApply', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.transaction.compoffApply', {
        url: '/compoffApply',
        // abstract: true,
        templateUrl: 'app/pages/attendance/transaction/compoffApply/attendance.compoffApply.html',
        controller: "attTranscompoffApplyController",
        controllerAs: "attCtrl",
        title: 'Comp Off Apply',
        sidebarMeta: {
          order: 5,
          parent: 'attendance.transaction',
          pageTitle: 'Comp Off Apply'
        },
      })
  }

})();
