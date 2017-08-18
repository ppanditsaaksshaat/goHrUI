/**
 * @author deepak.jain
 * created on 27.07.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.getstarted', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
      
    $stateProvider
        .state('getstarted', {
          url: '/getstarted',
          templateUrl: 'app/pages/getstarted/getstarted.html',
          title: 'Get Started',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });
  }

})();
