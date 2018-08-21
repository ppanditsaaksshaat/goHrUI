/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.leaves.leavecontrol', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.leaves.leavecontrol', {
        url: '/leavecontrol',
        templateUrl: 'app/pages/configuration/leaveholiday/leavecontrol/leavecontrol.html',
        controller: 'leavecontrolController',
        title: 'Leave Control',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
      });
  }

})();
