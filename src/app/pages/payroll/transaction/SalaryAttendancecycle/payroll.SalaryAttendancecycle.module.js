
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.SalaryAttendancecycle', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.transaction.SalaryAttendancecycle', {
        url: '/SalaryAttendancecycle',
        // abstract: true,
        templateUrl: 'app/pages/payroll/transaction/SalaryAttendancecycle/payroll.SalaryAttendancecycle.html?v=1',
        controller: "paySalaryAttendancecycleController",
        controllerAs: "payCtrl",
        title: 'SalaryAttcycle',
        sidebarMeta: {
          order: 1,
          parent: 'payroll.transaction',
          pageTitle: 'Salary Attendance Cycle'
        },
      })
  }

})();
