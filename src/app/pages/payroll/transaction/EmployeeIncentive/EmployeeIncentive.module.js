
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.EmployeeIncentive', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.transaction.EmployeeIncentive', {
        url: '/EmployeeIncentive',
        // abstract: true,
        templateUrl: 'app/pages/payroll/transaction/EmployeeIncentive/EmployeeIncentive.html?v=1',
        controller: "payEmployeeIncentiveController",
        controllerAs: "payCtrl",
        title: 'Employee Incentive',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.transaction',
          pageTitle: 'Employee Incentive'
        },
      })
  }

})();
