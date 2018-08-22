/**
 * @author NKM
 * created on 20.08.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.loanadvance', [
    'BlurAdmin.pages.configuration.loanadvance.loanprovider',
    'BlurAdmin.pages.configuration.loanadvance.advancerule',
    'BlurAdmin.pages.configuration.loanadvance.advancetype',
    'BlurAdmin.pages.configuration.loanadvance.loancategory',
    'BlurAdmin.pages.configuration.loanadvance.loantype',

    // 'BlurAdmin.pages.configuration.leaves.initial',
    // 'BlurAdmin.pages.configuration.leaves.leavetype',
    // 'BlurAdmin.pages.configuration.leaves.holiday',
    // 'BlurAdmin.pages.configuration.leaves.holidayconfbylocation',
    // 'BlurAdmin.pages.configuration.leaves.holiday'
  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.loanadvance', {
        url: '/loanadvance',
        template: "<top-nav menu=\"'configuration.loanadvance'\"></top-nav>",
        //controller: 'companyController',
        title: 'Leave & Holiday',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 1,
        },
      });
    $urlRouterProvider.when('/configuration/loanadvance', '/configuration/loanadvance/loanprovider');
  }

})();
