/**
 * @author santosh.kushwaha
 * created on 20/05/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports', [
    'BlurAdmin.pages.payroll.reports.paySlips',
    'BlurAdmin.pages.payroll.reports.payregister',
    'BlurAdmin.pages.payroll.reports.coveringLetter',
    'BlurAdmin.pages.payroll.reports.empSalaryType',

    'BlurAdmin.pages.payroll.reports.pfForm5',
    'BlurAdmin.pages.payroll.reports.pfForm10',
    'BlurAdmin.pages.payroll.reports.pfMonthlyReturn',
    'BlurAdmin.pages.payroll.reports.12ARevised',
    'BlurAdmin.pages.payroll.reports.combinedChallan',
    'BlurAdmin.pages.payroll.reports.pfContribution',

    'BlurAdmin.pages.payroll.reports.eSIChallanForm',
    'BlurAdmin.pages.payroll.reports.ECREPFDetail',
    'BlurAdmin.pages.payroll.reports.ECRESIDetail',
    'BlurAdmin.pages.payroll.reports.taxComputation',

    // 'BlurAdmin.pages.payroll.reports.Challan',
    // 'BlurAdmin.pages.payroll.reports.test'
  ])
    .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('payroll.reports', {
        url: '/reports',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Reports',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 50,
        },
      })
  }

})();
