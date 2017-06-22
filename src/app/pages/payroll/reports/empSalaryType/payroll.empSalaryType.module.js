
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.empSalaryType', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.empSalaryType', {
        url: '/empSalaryType',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/empSalaryType/payroll.empSalaryType.html?v=1',
        controller: "empSalaryTypeController",
        controllerAs: "payCtrl",
        title: 'Employee Salary Type',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.reports',
          pageTitle: 'Employee Salary Type'
        },
      })
  }

})();
