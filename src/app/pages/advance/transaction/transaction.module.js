/**
 * @author 
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.advance.transaction', [
     
     'BlurAdmin.pages.advance.transaction.advancestatus',
     'BlurAdmin.pages.advance.transaction.advanceapplication'
     
     
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('advance.transaction', {
        url: '/transaction',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Trasaction',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 100,
        },
      }).state('advance.transaction.add', {
        url: '/:action',
        templateUrl: 'app/pages/advance/transaction/advanceapplication/advance.advanceapplication.html',
        title: 'Add Application',
        // controller: "attTransManualController",
        // controllerAs: "addCtrl"
      })
  }

})();
