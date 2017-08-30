/**
 * @author santosh.kushwaha
 * created on 20/05/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.reports', [
    'BlurAdmin.pages.loan.reports.empLoanApplication',
<<<<<<< HEAD
    'BlurAdmin.pages.loan.reports.empLoanDetail',
=======
    'BlurAdmin.pages.loan.reports.loanOutStanding',
>>>>>>> 5b3872c6450793570fdc5c6f6651118a99638cd5
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
