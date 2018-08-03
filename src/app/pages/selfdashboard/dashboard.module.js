/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.selfdashboard', [
      'BlurAdmin.pages.selfdashboard.trafficChart'
    ])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
        .state('selfdashboard', {
          url: '/selfdashboard',
          templateUrl: 'app/pages/selfdashboard/dashboard.html',
          controller: 'dashboardCtrl',
          title: 'Dashboard',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 1,
          },
        });
    }
  
  })();
  