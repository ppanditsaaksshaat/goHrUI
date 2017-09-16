/**
 * @author deepak.jain
 * created on 24/04/2017
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.urm', [
        'BlurAdmin.pages.urm.permission'
    ])
        .config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('urm', {
            url: '/urm',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            title: 'User and Role',
            sidebarMeta: {
              icon: 'ion-pound',
              order: 10,
            },
          });
    }
  })();
  