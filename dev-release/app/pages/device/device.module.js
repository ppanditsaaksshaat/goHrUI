/**
 * @author deepak.jain
 * created on 22.03.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.device', [
        'BlurAdmin.pages.device.devicemaster'
    ])
        .config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('device', {
            url: '/device',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            title: 'Device',
            headerCode: 'payroll',
            sidebarMeta: {
              icon: 'ion-pound',
              order: 3,
            },
          });
    }
  
  })();
  