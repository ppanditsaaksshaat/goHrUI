/**
 * @author deepak.jain
 * created on 24/04/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll', [
    'BlurAdmin.pages.payroll.masters'
  ])
      .config(routeConfig);
      
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('payroll', {
          url: '/payroll',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Payroll',
          sidebarMeta: {
            icon: 'ion-pound',
            order: 5,
          },
        });
  }

})();
