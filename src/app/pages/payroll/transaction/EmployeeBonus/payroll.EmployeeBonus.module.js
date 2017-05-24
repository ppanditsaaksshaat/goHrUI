
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.EmployeeBonus', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.transaction.EmployeeBonus', {
        url: '/EmployeeBonus',
        // abstract: true,
        templateUrl: 'app/pages/payroll/transaction/EmployeeBonus/payroll.EmployeeBonus.html?v=1',
        controller: "payEmployeeBonusController",
        controllerAs: "payCtrl",
        title: 'EmployeeBonus',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.transaction',
          pageTitle: 'EmployeeBonus'
        },
      })
  }

})();
