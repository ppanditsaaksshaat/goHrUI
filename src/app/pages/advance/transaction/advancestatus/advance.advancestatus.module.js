
/**
 * @author 
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.advance.transaction.advancestatus', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('advance.transaction.advancestatus', {
        url: '/advancestatus',
      //  abstract: true,
        templateUrl: 'app/pages/advance/transaction/advancestatus/advance.advancestatus.html',
        controller: "AdvanceStatusController",
        controllerAs: "attCtrl",
        title: 'Advance Status',
        sidebarMeta: {
          order: 0,
          parent: 'advance.transaction',
          pageTitle: 'Advance Status'
        },
      })
  }

})();
