/**
 * @author 
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.transaction', [
     'BlurAdmin.pages.leave.transaction.employeeleaveapplication',
     'BlurAdmin.pages.leave.transaction.leaveapplication',
     'BlurAdmin.pages.leave.transaction.leavestatement',
     'BlurAdmin.pages.leave.transaction.leavetransactiondetail'
     
     
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('leave.transaction', {
        url: '/transaction',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Trasaction',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 100,
        },
      }).state('leave.transaction.add', {
        url: '/:action',
        templateUrl: 'app/pages/leave/transaction/leaveapplication/leave.leaveapplication.html',
        title: 'Add Application',
        // controller: "attTransManualController",
        // controllerAs: "addCtrl"
      })
  }

})();
