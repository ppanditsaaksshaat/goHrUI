/**
 * @author NKM
 * created on 19/11/2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.reporturm', [
    'BlurAdmin.pages.reporturm.permission',
    // 'BlurAdmin.pages.urm.userlist'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('reporturm', {
        url: '/reporturm',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'User and Role',
        sidebarMeta: {
          icon: 'ion-pound',
          order: 10,
        },
      });
  }
})();
