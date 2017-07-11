
/**
 * @author 
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.advance.transaction.midMonth', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('advance.transaction.midMonth', {
        url: '/midMonth',
      //  abstract: true,
        templateUrl: 'app/pages/advance/transaction/midMonth/advance.midMonth.html?v=1',
        controller: "midMonthController",
        controllerAs: "attCtrl",
        title: 'Mid Month',
        sidebarMeta: {
          order: 0,
          parent: 'advance.transaction',
          pageTitle: 'Mid Month'
        },
      })
  }

})();
