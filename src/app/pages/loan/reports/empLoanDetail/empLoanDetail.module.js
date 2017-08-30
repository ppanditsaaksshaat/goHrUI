
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.loan.reports.empLoanDetail', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
  
      $stateProvider
        .state('loan.reports.empLoanDetail', {
          url: '/empLoanDetail',
          // abstract: true,
          templateUrl: 'app/pages/loan/reports/empLoanDetail/empLoanDetail.html',
          controller: "empLoanDetailController",
          controllerAs: "payCtrl",
          title: 'Loan Detail',
          sidebarMeta: {
            order: 1,
            parent: 'loan.reports',
            pageTitle: 'Loan Detail' 
          },
        })
    }
  
  })();
  