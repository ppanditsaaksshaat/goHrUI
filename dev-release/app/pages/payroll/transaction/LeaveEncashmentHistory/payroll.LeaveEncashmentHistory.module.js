
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.LeaveEncashmentHistory', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.transaction.LeaveEncashmentHistory', {
        url: '/LeaveEncashmentHistory',
        // abstract: true,
        templateUrl: 'app/pages/payroll/transaction/LeaveEncashmentHistory/payroll.LeaveEncashmentHistory.html',
        controller: "payLeaveEncashmentHistoryController",
        controllerAs: "payCtrl",
        title: 'Encash History',
        sidebarMeta: {
          order: 4,
          parent: 'payroll.transaction',
          pageTitle: 'Encashment History'
        },
      })
  }

})();
