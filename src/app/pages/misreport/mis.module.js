/**
 * @author deepak.jain
 * created on 08.05.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mis', [
    'BlurAdmin.pages.mis.masterReport'
  ])
      .config(routeConfig);
      
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mis', {
          url: '/mis',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'MIS Report',
          sidebarMeta: {
            icon: 'ion-ios-list-outline',
            order: 7,
          },
        });
  }
})();
