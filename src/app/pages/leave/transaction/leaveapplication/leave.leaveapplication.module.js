
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.transaction.leaveapplication', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('leave.transaction.leaveapplication', {
        url: '/leaveapplication',
      //  abstract: true,
        templateUrl: 'app/pages/leave/transaction/leaveapplication/leave.leaveapplication.html?v=1',
        controller: "LeaveAppController",
        controllerAs: "attCtrl",
        title: 'Leave App',
        sidebarMeta: {
          order: 0,
          parent: 'leave.transaction',
          pageTitle: 'Leave App'
        },
      })
  }

})();
