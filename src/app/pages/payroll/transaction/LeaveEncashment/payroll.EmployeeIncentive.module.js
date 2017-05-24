
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.LeaveEncashment', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.transaction.LeaveEncashment', {
        url: '/LeaveEncashment',
        // abstract: true,
        templateUrl: 'app/pages/payroll/transaction/LeaveEncashment/payroll.LeaveEncashment.html?v=1',
        controller: "payLeaveEncashmentController",
        controllerAs: "payCtrl",
        title: 'Encashment Apply',
        sidebarMeta: {
          order: 3,
          parent: 'payroll.transaction',
          pageTitle: 'Leave Encashment'
        },
      })
  }

})();
