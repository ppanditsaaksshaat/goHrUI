/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance', [
    'BlurAdmin.pages.attendance.masters',
    'BlurAdmin.pages.attendance.transaction',
    'BlurAdmin.pages.attendance.reports',
    'BlurAdmin.pages.attendance.synctable',
    'BlurAdmin.pages.attendance.shiftmaster'
  ])

    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('attendance', {
        url: '/attendance',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Attendance',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 100,
        },
      });
  }

})();
