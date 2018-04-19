/**
 * @author santosh.kushwaha
 * created on 20/05/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction', [
    'BlurAdmin.pages.attendance.transaction.manual',
    'BlurAdmin.pages.attendance.transaction.upload',
    'BlurAdmin.pages.attendance.transaction.verify',
    'BlurAdmin.pages.attendance.transaction.verified',
    'BlurAdmin.pages.attendance.transaction.compoffApply',
    'BlurAdmin.pages.attendance.transaction.outdoorapply',
    'BlurAdmin.pages.attendance.transaction.manualmonth',
    'BlurAdmin.pages.attendance.transaction.manualmonthlyatt',
    'BlurAdmin.pages.attendance.transaction.dailysummary',
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('attendance.transaction', {
        url: '/transaction',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Trasaction',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 100,
        },
      }).state('attendance.transaction.add', {
        url: '/:action',
        templateUrl: 'app/pages/attendance/transaction/manual/attendance.manualAdd.html',
        title: 'Add Application',
        // controller: "attTransManualController",
        // controllerAs: "addCtrl"
      })
  }

})();
