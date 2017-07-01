
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.payRoll.esiRule', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.payRoll.esiRule', {
        url: '/esiRule',
      //  abstract: true,
        templateUrl: 'app/pages/organization/payRoll/esiRule/organization.esiRule.html?v=1',
        controller: "esiRuleController",
        controllerAs: "attCtrl",
        title: 'ESI Rule',
        sidebarMeta: {
          order: 1,
          parent: 'organization.payRoll',
          pageTitle: 'ESI Rule'
        },
      })
  }

})();
