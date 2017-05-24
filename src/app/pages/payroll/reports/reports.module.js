/**
 * @author santosh.kushwaha
 * created on 20/05/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports', [
     'BlurAdmin.pages.payroll.reports.payregister' ,
     'BlurAdmin.pages.payroll.reports.monthlychallan', 
     'BlurAdmin.pages.payroll.reports.OnlineECR',
      'BlurAdmin.pages.payroll.reports.OnlineESIC',
      'BlurAdmin.pages.payroll.reports.yearlychallan'
    
       ])
    .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('payroll.reports', {
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
