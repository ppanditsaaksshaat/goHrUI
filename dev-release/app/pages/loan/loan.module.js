/**
 * @author deepak jain
 * created on 18/04/2017
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.loan', [   
    //  'BlurAdmin.pages.loan.loanmanagement',
     'BlurAdmin.pages.loan.masters',
     'BlurAdmin.pages.loan.transaction',
     'BlurAdmin.pages.loan.reports'
    
    
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('loan', {
          url: '/loan',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Loan',
          headerCode: 'payroll',
          sidebarMeta: {
            icon: 'ion-briefcase',
            order: 4,
          },
        });
  }

})();
