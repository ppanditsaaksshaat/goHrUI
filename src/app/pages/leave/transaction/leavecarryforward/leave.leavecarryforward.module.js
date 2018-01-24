
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.transaction.leavecarryforward', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('leave.transaction.leavecarryforward', {
        url: '/leavecarryforward',
      //  abstract: true,
        templateUrl: 'app/pages/leave/transaction/leavecarryforward/leave.leavecarryforward.html',
        controller: "carrryForwardController",
        controllerAs: "attCtrl",
        title: 'Yearly Carry Forward Leave',
        sidebarMeta: {
          order: 3,
          parent: 'leave.transaction',
          pageTitle: 'Yearly Carry Forward Leave'
        },
      })
  }

})();
