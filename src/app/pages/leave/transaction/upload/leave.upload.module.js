

/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.transaction.upload', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('leave.transaction.upload', {
        url: '/upload',
        // abstract: true,
        templateUrl: 'app/pages/leave/transaction/upload/leave.upload.html',
        controller: "leaveUploadController",
        controllerAs: "attCtrl",
        sidebarMeta: {
          order: 1,
          parent: 'leave.transaction',
          pageTitle: 'Leave Upload'
        },
      })
  }

})();
