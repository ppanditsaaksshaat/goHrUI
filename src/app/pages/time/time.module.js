/**
 * @author deepak.jain
 * created on 08.05.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.time', [
    'BlurAdmin.pages.time.masters'
  ])
      .config(routeConfig);
      
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('time', {
          url: '/time',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Time',
          sidebarMeta: {
            icon: 'ion-clock',
            order: 2,
          },
        });
  }
})();
