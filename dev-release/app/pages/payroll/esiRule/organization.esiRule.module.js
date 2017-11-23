
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.esiRule', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.payRoll.esiRule', {
        url: '/esiRule',
      //  abstract: true,
        templateUrl: 'app/pages/organization/payRoll/esiRule/organization.esiRule.html',
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
