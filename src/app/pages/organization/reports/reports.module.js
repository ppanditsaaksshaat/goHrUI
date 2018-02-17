/**
 * @author santosh.kushwaha
 * created on 20/05/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.reports', [
    
    'BlurAdmin.pages.organization.reports.empDetail',
    // 'BlurAdmin.pages.organization.reports.empJoiningDt',
    
  ])
    .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('organization.reports', {
        url: '/reports',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Report',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 4,
        },
      })
  }

})();
