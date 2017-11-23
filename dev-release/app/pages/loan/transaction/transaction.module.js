/**
 * @author 
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.transaction', [

    //  'BlurAdmin.pages.loan.transaction.loaninstallment',
    'BlurAdmin.pages.loan.transaction.loanapplication'

  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('loan.transaction', {
        url: '/transaction',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Trasaction',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 100,
        },
      }).state('loan.transaction.add', {
        url: '/:action',
        templateUrl: 'app/pages/loan/transaction/loanapplication/loan.loanapplication.html',
        title: 'Add Application',
        // controller: "attTransManualController",
        // controllerAs: "addCtrl"
      })
  }

})();
