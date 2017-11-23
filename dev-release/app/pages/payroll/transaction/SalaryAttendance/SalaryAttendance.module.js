
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.SalaryAttendance', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.transaction.SalaryAttendance', {
        url: '/SalaryAttendance',
        // abstract: true,
        templateUrl: 'app/pages/payroll/transaction/SalaryAttendance/SalaryAttendance.html',
        controller: "SalaryAttendanceController",
        controllerAs: "payCtrl",
        title: 'SalaryAttendance',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.transaction',
          pageTitle: 'SalaryAttendance'
        },
      })
  }

})();
