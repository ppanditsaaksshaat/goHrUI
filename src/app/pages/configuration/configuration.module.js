/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration', [
  ]).config(routeConfig);
      
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('configuration', {
          url: '/configuration',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Configuration',
          sidebarMeta: {
            icon: 'ion-ios-people',
            order: 10,
          },
        });
  }

})();
