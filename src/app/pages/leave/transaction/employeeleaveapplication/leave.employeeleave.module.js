
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.transaction.employeeleaveapplication', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('leave.transaction.employeeleaveapplication', {
        url: '/leaveapplication',
      //  abstract: true,
        templateUrl: 'app/pages/leave/transaction/employeeleaveapplication/leave.employeeleave.html',
        controller: "EmpLeaveAppController",
        controllerAs: "leaveCtrl",
        title: 'Leave Application',
        sidebarMeta: {
          order: 0,
          parent: 'leave.transaction',
          pageTitle: 'Leave Application'
        },
      })
  }

})();
