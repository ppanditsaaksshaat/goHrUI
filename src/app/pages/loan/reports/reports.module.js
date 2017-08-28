/**
 * @author santosh.kushwaha
 * created on 20/05/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.reports', [
    'BlurAdmin.pages.loan.reports.empLoanApplication',
    'BlurAdmin.pages.loan.reports.loanOutStanding',
  ])
    .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('loan.reports', {
        url: '/reports',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'reports',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 2,
        },
      })
  }

})();
