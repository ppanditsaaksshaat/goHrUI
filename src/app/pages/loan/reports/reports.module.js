/**
 * @author santosh.kushwaha
 * created on 20/05/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.reports', [
    'BlurAdmin.pages.loan.reports.empLoanApplication',
    'BlurAdmin.pages.loan.reports.empLoanDetail',
  ])
    .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('loan.reports', {
        url: '/reports',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Reports',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 4,
        },
      })
  }

})();
