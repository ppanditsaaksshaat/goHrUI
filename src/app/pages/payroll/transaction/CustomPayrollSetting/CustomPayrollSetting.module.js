
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.CustomPayrollSetting', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.transaction.CustomPayrollSetting', {
        url: '/CustomPayrollSetting',
        // abstract: true,
        templateUrl: 'app/pages/payroll/transaction/CustomPayrollSetting/CustomPayrollSetting.html?v=1',
        controller: "CustomPayrollSettingController",
        controllerAs: "payCtrl",
        title: 'Payroll Process',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.transaction',
          pageTitle: 'Payroll Process'
        },
      })
  }

})();
