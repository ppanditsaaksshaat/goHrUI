/**
 * @author santosh.kushwaha
 * created on 20/05/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.tax', [
    'BlurAdmin.pages.payroll.tax.taxslab',
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('payroll.tax', {
        url: '/tax',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Tax',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 4,
        },
      })
  }

})();
