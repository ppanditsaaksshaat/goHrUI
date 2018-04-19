/**
 * @author nitesh mishra
 * created on 07/12/2017
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.tds', [   
     'BlurAdmin.pages.tds.transaction',
    
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('tds', {
          url: '/tds',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'TDS',
          headerCode: 'payroll',
          sidebarMeta: {
            icon: 'ion-briefcase',
            order: 1,
          },
        });
  }

})();
