/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.timeattendance.rosterplan', [
    // 'BlurAdmin.pages.configuration.payroll.payslip.setting'

  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.timeattendance.rosterplan', {
        url: '/rosterplan',
        templateUrl: 'app/pages/configuration/timeattendance/rosterplan/rosterplan.html',
        controller: 'rosterplanController',
        title: 'Roster Detail',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 4,
        },
      });
  }

})();
