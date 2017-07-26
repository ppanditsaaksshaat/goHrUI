
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.shiftmaster', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.shiftmaster', {
        url: '/shiftmaster',
        // abstract: true,
        templateUrl: 'app/pages/attendance/shiftmaster/shiftmaster.html?v=1',
        controller: "shiftMasterController",
        controllerAs: "attCtrl",
        title: 'Shift Master',
        sidebarMeta: {
          order: 0,
          parent: 'attendance',
          pageTitle: 'Shift Master'
        },
      })
      
  }

})();
