
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.payRoll.paybandRuleDetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.payRoll.paybandRuleDetail', {
        url: '/paybandRuleDetail',
      //  abstract: true,
        templateUrl: 'app/pages/organization/payRoll/paybandRuleDetail/organization.paybandRuleDetail.html?v=1',
        controller: "paybandRuleController",
        controllerAs: "attCtrl",
        title: 'Payband Rule',
        sidebarMeta: {
          order: 6,
          parent: 'organization.payRoll',
          pageTitle: 'Payband Rule Detail'
        },
      })
  }

})();
