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
     'BlurAdmin.pages.attendance.transaction.compoffApply',
     'BlurAdmin.pages.attendance.transaction.compoffapprove',
     'BlurAdmin.pages.attendance.transaction.outdoorapply',
     'BlurAdmin.pages.attendance.transaction.outdoorapprove'
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
      })
  }

})();