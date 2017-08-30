
/**
 * @author 
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.advance.transaction.advanceapplication', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('advance.transaction.advanceapplication', {
        url: '/advanceapplication',
      //  abstract: true,
        templateUrl: 'app/pages/advance/transaction/advanceapplication/advance.advanceapplication.html',
        controller: "AdvanceAppController",
        controllerAs: "attCtrl",
        title: 'Advance App',
        sidebarMeta: {
          order: 0,
          parent: 'advance.transaction',
          pageTitle: 'Advance App'
        },
      })
  }

})();
