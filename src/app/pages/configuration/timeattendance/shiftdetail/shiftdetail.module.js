/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.timeattendance.shiftdetail', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.timeattendance.shiftdetail', {
        url: '/shiftdetail',
        templateUrl: 'app/pages/configuration/timeattendance/shiftdetail/shiftdetail.html',
        controller: 'shiftdetailController',
        title: 'Shift Plan',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 2,
        },
      });
  }

})();
