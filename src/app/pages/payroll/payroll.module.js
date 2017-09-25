/**
 * @author deepak.jain
 * created on 24/04/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll', [
    
    'BlurAdmin.pages.payroll.masters',
    'BlurAdmin.pages.payroll.transaction',
     'BlurAdmin.pages.payroll.reports',
     'BlurAdmin.pages.payroll.tax',
     'BlurAdmin.pages.payroll.service',
     'BlurAdmin.pages.payroll.otRule',
     'BlurAdmin.pages.payroll.esiRule',
     'BlurAdmin.pages.payroll.epfRule',
     'BlurAdmin.pages.payroll.Challan',
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
          headerCode: 'payroll',
          sidebarMeta: {
            icon: 'ion-pound',
            order: 6,
          },
        });
  }

})();
