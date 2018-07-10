/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.selfattendance', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
        .state('selfattendance', {
          url: '/attendance',
          templateUrl: 'app/pages/selfattendance/attendance.html',
          controller: '',
          title: 'Attendance',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 1,
          },
        });
    }
  
  })();
  