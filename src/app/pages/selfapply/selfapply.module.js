/**
 * 
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.selfapply', [
    'BlurAdmin.pages.selfapply.advance',
    'BlurAdmin.pages.selfapply.assets',
    'BlurAdmin.pages.selfapply.compoff',
    'BlurAdmin.pages.selfapply.leave',
    'BlurAdmin.pages.selfapply.loan',
    'BlurAdmin.pages.selfapply.outduty'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('selfapply', {
        url: '/selfapply',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Self Apply',
        sidebarMeta: {
          icon: 'ion-pound',
          order: 4,
        },
      });
  }
})();
