/**
 * @author KNM
 * created on 25.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.selfapprovals', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
        .state('selfapprovals', {
          url: '/selfapprovals',
          templateUrl: 'app/pages/selfapprovals/approvals.html',
          controller: 'selfapprovalsPageCtrl',
          title: 'Approvals',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 1,
          },
        });
    }
  
  })();
  