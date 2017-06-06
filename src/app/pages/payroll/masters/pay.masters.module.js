
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.masters', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,$urlRouterProvider) {
   
    $stateProvider
        .state('payroll.masters', {
          url: '/masters',
          abstract: true,
          templateUrl: 'app/pages/payroll/masters/pay.master.html?v=1',
          controller: "PayMastersController",
          controllerAs: "tabCtrl",
          title: 'Master',
          sidebarMeta: {
            order: 0,
          },
        })
         .state('payroll.masters.list', {
           url: '/:name/:pageId',
         templateUrl: 'app/pages/payroll/masters/list/mastersList.html',
         title: 'payroll Masters',
         controller: "payMastersListController",
         controllerAs: "listCtrl"
         });
        // .state('payroll.masters.detail', {
        //   url: '/:pageId/:id',
        //   templateUrl: 'app/pages/payroll/masters/detail/mastersDetail.html',
        //   title: 'payroll Masters',
        //   controller: "attMastersDetailController",
        //   controllerAs: "detailCtrl"
        // }).state('payroll.masters.add', {
        //   url: '/:name/:action/:pageId/',
        //   templateUrl: 'app/pages/payroll/masters/add/add.html',
        //   title: 'payroll Masters',
        //   controller: "attMastersAddController1",
        //   controllerAs: "addCtrl"
        // }).state('payroll.masters.edit', {
        //   url: '/:name/:action/:pageId/:pkId/',
        //   templateUrl: 'app/pages/payroll/masters/add/add.html',
        //   title: 'payroll Masters',
        //   controller: "attMastersAddController1",
        //   controllerAs: "addCtrl"
        // });
    $urlRouterProvider.when('/payroll/masters','/payroll/masters/location/34');
  }

})();
