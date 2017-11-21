/**
 * @author santosh.kushwaha
 * created on 20/05/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.service', [
    'BlurAdmin.pages.payroll.service.servicedetail',
    'BlurAdmin.pages.payroll.service.servicecalculation',
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('payroll.service', {
        url: '/service',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Service',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 5,
        },
      })
  }

})();
