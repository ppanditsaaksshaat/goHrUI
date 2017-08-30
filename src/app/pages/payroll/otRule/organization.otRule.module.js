
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.otRule', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.payRoll.otRule', {
        url: '/otRule',
      //  abstract: true,
        templateUrl: 'app/pages/organization/payRoll/otRule/organization.otRule.html',
        controller: "otRuleController",
        controllerAs: "attCtrl",
        title: 'OT Rule',
        sidebarMeta: {
          order: 2,
          parent: 'organization.payRoll',
          pageTitle: 'OT Rule'
        },
      })
  }

})();
