
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.payRoll.paybandSlabDetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.payRoll.paybandSlabDetail', {
        url: '/paybandSlabDetail',
      //  abstract: true,
        templateUrl: 'app/pages/organization/payRoll/paybandSlabDetail/organization.paybandSlabDetail.html?v=1',
        controller: "paybandSlabController",
        controllerAs: "attCtrl",
        title: 'Payband Slab',
        sidebarMeta: {
          order: 7,
          parent: 'organization.payRoll',
          pageTitle: 'Payband Slab Detail'
        },
      })
  }

})();
