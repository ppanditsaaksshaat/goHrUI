
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.payRoll.epfRule', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.payRoll.epfRule', {
        url: '/epfRule',
      //  abstract: true,
        templateUrl: 'app/pages/organization/payRoll/epfRule/organization.epfRule.html?v=1',
        controller: "epfRuleController",
        controllerAs: "attCtrl",
        title: 'EPF Rule',
        sidebarMeta: {
          order: 0,
          parent: 'organization.payRoll',
          pageTitle: 'EPF Rule'
        },
      })
  }

})();
