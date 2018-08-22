/**
 * @author NKM
 * created on 21.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.payroll.payrollsetting', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.payroll.payrollsetting', {
        url: '/payrollsetting',
        templateUrl: 'app/pages/configuration/payroll/payrollsetting/payrollsetting.html',
        controller: 'payrollController',
        title: 'Payroll Setting',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
      });
  }

})();
