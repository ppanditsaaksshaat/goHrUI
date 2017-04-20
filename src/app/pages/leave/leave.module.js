/**
 * @author deepak jain
 * created on 18/04/2017
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.leave', [
    'BlurAdmin.pages.leave.masters',
    'BlurAdmin.pages.leave.applications',
  
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('leave', {
          url: '/leave',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Leave',
          sidebarMeta: {
            icon: 'ion-gear-a',
            order: 101,
          },
        });
  }

})();
