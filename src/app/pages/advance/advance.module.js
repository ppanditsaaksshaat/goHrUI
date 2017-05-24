/**
 * @author deepak.jain
 * created on 24/04/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.advance', [
    'BlurAdmin.pages.advance.masters'
    //,
   // 'BlurAdmin.pages.advance.transaction',
    //'BlurAdmin.pages.advance.reports'

 
  ])
      .config(routeConfig);
      
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('advance', {
          url: '/advance',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'advance',
          sidebarMeta: {
            icon: 'ion-pound',
            order: 1,
          },
        });
  }

})();
