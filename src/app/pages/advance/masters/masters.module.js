
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.advance.masters', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,$urlRouterProvider) {
   
    $stateProvider
        .state('advance.masters', {
          url: '/masters',
          abstract: true,
          templateUrl: 'app/pages/advance/masters/masters.html?v=1',
          controller: "advMastersController1",
          controllerAs: "tabCtrl",
          title: 'Master',
          sidebarMeta: {
            order: 0,
          },
        }).state('advance.masters.list', {
          url: '/:name/:pageId',
          templateUrl: 'app/pages/advance/masters/list/mastersList.html',
          title: 'advance Masters',
          controller: "advMastersListController1",
          controllerAs: "listCtrl"
        });
    $urlRouterProvider.when('/advance/masters','/advance/masters/advancetype/257');
  }

})();
