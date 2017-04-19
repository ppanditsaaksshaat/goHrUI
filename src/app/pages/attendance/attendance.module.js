/**
 * @author deepak jain
 * created on 18/04/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance', [
    'BlurAdmin.pages.attendance.masters',

  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('attendance', {
          url: '/attendance',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'attendance',
          sidebarMeta: {
            icon: 'ion-gear-a',
            order: 101,
          },
        });
  }

})();
