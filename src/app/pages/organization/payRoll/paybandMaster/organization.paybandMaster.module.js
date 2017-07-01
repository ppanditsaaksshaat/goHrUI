
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.payRoll.paybandMaster', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.payRoll.paybandMaster', {
        url: '/paybandMaster',
      //  abstract: true,
        templateUrl: 'app/pages/organization/payRoll/paybandMaster/organization.paybandMaster.html?v=1',
        controller: "paybandMasterController",
        controllerAs: "attCtrl",
        title: 'Payband Master',
        sidebarMeta: {
          order: 4,
          parent: 'organization.payRoll',
          pageTitle: 'Payband Master'
        },
      })
  }

})();
