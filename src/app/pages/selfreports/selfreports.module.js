/**
 * @author deepak.jain
 * created on 24/04/2017
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.selfreports', [
      'BlurAdmin.pages.roster.roster',
      'BlurAdmin.pages.roster.plan'
    ])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
        .state('report', {
          url: '/report',
          template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Roaster Plan',
          sidebarMeta: {
            icon: 'ion-pound',
            order: 7,
          },
        });
    }
  })();
  