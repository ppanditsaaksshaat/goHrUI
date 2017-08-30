
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.coveringLetter', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('payroll.reports.coveringLetter', {
        url: '/coveringLetter',
        // abstract: true,
        templateUrl: 'app/pages/payroll/reports/coveringLetter/payroll.coveringLetter.html',
        controller: "coveringLetterController",
        controllerAs: "payCtrl",
        title: 'Covering Letter',
        sidebarMeta: {
          order: 2,
          parent: 'payroll.reports',
          pageTitle: 'Covering Letter'
        },
      })
  }

})();
