
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.payRoll.paybandHeadDetail', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.payRoll.paybandHeadDetail', {
        url: '/paybandHeadDetail',
      //  abstract: true,
        templateUrl: 'app/pages/organization/payRoll/paybandHeadDetail/organization.paybandHeadDetail.html?v=1',
        controller: "paybandHeadController",
        controllerAs: "attCtrl",
        title: 'Payband Head',
        sidebarMeta: {
          order: 5,
          parent: 'organization.payRoll',
          pageTitle: 'Payband Head Detail'
        },
      })
  }

})();
