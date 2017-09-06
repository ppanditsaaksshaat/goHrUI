/**
 * @author deepak jain
 * created on 18/04/2017
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.leave', [
    // 'BlurAdmin.pages.leave.applications',
    'BlurAdmin.pages.leave.appadd',
    'BlurAdmin.pages.leave.masters',
    'BlurAdmin.pages.leave.transaction',
    'BlurAdmin.pages.leave.reports'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('leave', {
        url: '/leave',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Leave',
        sidebarMeta: {
          icon: 'ion-android-calendar',
          order: 5,
        },
      });
  }

})();
