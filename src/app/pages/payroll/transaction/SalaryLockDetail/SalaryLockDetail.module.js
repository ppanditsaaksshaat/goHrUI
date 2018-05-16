
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.payroll.transaction.SalaryLockDetail', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
  
      $stateProvider
        .state('payroll.transaction.SalaryLockDetail', {
          url: '/SalaryLockDetail',
          // abstract: true,
          templateUrl: 'app/pages/payroll/transaction/SalaryLockDetail/SalaryLockDetail.html',
          controller: "SalaryLockDetailController",
          title: 'Salary Lock Detail',
          sidebarMeta: {
            order: 2,
            parent: 'payroll.transaction',
            pageTitle: 'Salary Lock Detail'
          },
        })
    }
  
  })();
  