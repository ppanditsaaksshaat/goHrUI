/**
 * @author deepak.jain
 * created on 24/04/2017
 */
(function () {
  'use strict';







  angular.module('BlurAdmin.pages.help', [

  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      // .state('help', {
      //   url: '/help',
      //   template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
      //   abstract: true,
      //   title: 'User and Role',
      //   sidebarMeta: {
      //     icon: 'ion-pound',
      //     order: 10,
      //   },
      // });

      .state('help', {
        url: '/help',
        templateUrl: 'app/pages/help/help.html',
        controller: "helpPermissionController",
        controllerAs: "helpPer",
        title: 'Permission',
        sidebarMeta: {
          order: 1,
        },
      });
  }
})();

