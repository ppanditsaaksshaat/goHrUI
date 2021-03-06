

/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.upload', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('attendance.transaction.upload', {
        url: '/upload',
        // abstract: true,
        templateUrl: 'app/pages/attendance/transaction/upload/attendance.upload.html',
        controller: "attTransuploadController",
        controllerAs: "attCtrl",
        sidebarMeta: {
          order: 1,
          parent: 'attendance.transaction',
          pageTitle: 'Attendance Upload'
        },
      })
  }

})();
