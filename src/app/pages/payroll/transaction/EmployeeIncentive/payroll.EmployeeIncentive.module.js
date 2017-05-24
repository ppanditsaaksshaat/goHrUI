
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
        templateUrl: 'app/pages/payroll/transaction/EmployeeIncentive/payroll.EmployeeIncentive.html?v=1',
        controller: "PaySalarypayrollprocessController",
        controllerAs: "payCtrl",
        title: 'Employee Incentive',
        sidebarMeta: {
          order: 0,
          parent: 'payroll.transaction',
          pageTitle: 'Employee Incentive'
        },
      })
  }

})();
