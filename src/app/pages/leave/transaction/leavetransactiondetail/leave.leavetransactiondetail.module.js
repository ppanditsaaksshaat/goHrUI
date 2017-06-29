
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.transaction.leavetransactiondetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('leave.transaction.leavetransactiondetail', {
        url: '/leavetransactiondetail',
      //  abstract: true,
        templateUrl: 'app/pages/leave/transaction/leavetransactiondetail/leave.leavetransactiondetail.html?v=1',
        controller: "LeaveTransController",
        controllerAs: "attCtrl",
        title: 'Leave Transaction',
        sidebarMeta: {
          order: 4,
          parent: 'leave.transaction',
          pageTitle: 'Leave Transaction'
        },
      })
  }

})();
