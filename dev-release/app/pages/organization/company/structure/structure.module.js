
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.general.structure', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.general.structure', {
        url: '/structure',
        templateUrl: 'app/pages/organization/general/structure/structure.html',
        controller: "structureController",
        controllerAs: "tabCtrl",
        title: 'Location Structure',
        sidebarMeta: {
          order: 2,
          parent: 'organization.general'
        },
      }).state('organization.general.structure.list', {
        url: '/:name/:pageId',
        templateUrl: 'app/pages/organization/general/structure/structure.list.html',
        controller: "structureListController",
        controllerAs: "tabCtrl",
        title: 'Location Structure/ Masters',
        sidebarMeta: {
          order: 2
        },
      })
     $urlRouterProvider.when('/organization/general','/organization/general/location/34');
  }

})();
