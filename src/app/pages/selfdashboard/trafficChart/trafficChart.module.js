/**
 * @author NKM
 * created on 14.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.selfdashboard.trafficChart', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
        .state('selfdashboard.trafficChart', {
          url: '/trafficChart',
          templateUrl: 'app/pages/selfdashboard/trafficChart/trafficChart.html',
          controller: 'TrafficChartCtrl',
          title: 'TrafficChartCtrl',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 1,
          },
        });
    }
  
  })();
  