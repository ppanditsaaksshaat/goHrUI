
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.Salarypayrollprocess', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.transaction.Salarypayrollprocess', {
        url: '/Salarypayrollprocess',
        // abstract: true,
        templateUrl: 'app/pages/payroll/transaction/Salarypayrollprocess/payroll.Salarypayrollprocess.html?v=1',
        controller: "paySalarypayrollprocessController",
        controllerAs: "attCtrl",
        title: 'SalaryPayProcess',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.transaction',
          pageTitle: 'Salary Payroll Process'
        },
      })
  }

})();
