
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.masters', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,$urlRouterProvider) {
   
    $stateProvider
        .state('loan.masters', {
          url: '/masters',
          abstract: true,
          templateUrl: 'app/pages/loan/masters/masters.html',
          controller: "LoanMastersController1",
          controllerAs: "tabCtrl",
          title: 'Master',
          sidebarMeta: {
            order: 0,
          },
        }).state('loan.masters.list', {
          url: '/:name/:pageId',
          templateUrl: 'app/pages/loan/masters/list/mastersList.html',
          title: 'leave Masters',
          controller: "LoanMastersListController1",
          controllerAs: "listCtrl"
        });
    $urlRouterProvider.when('/loan/masters','/loan/masters/paymentmode/103');
  }

})();
