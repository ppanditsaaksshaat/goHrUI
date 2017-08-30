
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.payRoll.salaryHead', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('organization.payRoll.salaryHead', {
        url: '/salaryHead',
      //  abstract: true,
        templateUrl: 'app/pages/organization/payRoll/salaryHead/organization.salaryHead.html',
        controller: "salaryHeadController",
        controllerAs: "attCtrl",
        title: 'Salary Head',
        sidebarMeta: {
          order: 3,
          parent: 'organization.payRoll',
          pageTitle: 'Salary Head'
        },
      })
  }

})();
