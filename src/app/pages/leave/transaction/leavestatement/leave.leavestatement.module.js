
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.transaction.leavestatement', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('leave.transaction.leavestatement', {
        url: '/leavestatement',
      //  abstract: true,
        templateUrl: 'app/pages/leave/transaction/leavestatement/leave.leavestatement.html?v=1',
        controller: "LeaveStatementController",
        controllerAs: "attCtrl",
        title: 'Leave Statement',
        sidebarMeta: {
          order: 3,
          parent: 'leave.transaction',
          pageTitle: 'Leave Statement'
        },
      })
  }

})();
