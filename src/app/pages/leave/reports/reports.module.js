/**
 * @author santosh.kushwaha
 * created on 20/05/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.reports', [
     'BlurAdmin.pages.leave.reports.monthlyLeaveDetail' ,
     'BlurAdmin.pages.leave.reports.leaveDetail' ,
     'BlurAdmin.pages.leave.reports.leaveOutStanding' 
         
       ])
    .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('leave.reports', {
        url: '/reports',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'reports',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 100,
        },
      })
  }

})();
