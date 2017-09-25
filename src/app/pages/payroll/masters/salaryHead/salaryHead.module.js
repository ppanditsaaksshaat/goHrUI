
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.masters.salaryHead', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.masters.salaryHead', {
        url: '/salaryhead',
        //  abstract: true,
        templateUrl: 'app/pages/payroll/masters/salaryHead/salaryHead.html',
        controller: "salaryHeadController",
        controllerAs: "attCtrl",
        title: 'Salary Head',
        sidebarMeta: {
          order: 3
        },
      })
  }
})();
