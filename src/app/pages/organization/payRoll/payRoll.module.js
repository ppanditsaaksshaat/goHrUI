/**
 * @author 
 * 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.payRoll', [
    'BlurAdmin.pages.organization.payRoll.epfRule',
    'BlurAdmin.pages.organization.payRoll.esiRule',
    'BlurAdmin.pages.organization.payRoll.otRule',
    'BlurAdmin.pages.organization.payRoll.paybandHeadDetail',
    'BlurAdmin.pages.organization.payRoll.paybandMaster',
    'BlurAdmin.pages.organization.payRoll.paybandRuleDetail',
    'BlurAdmin.pages.organization.payRoll.paybandSlabDetail',
    'BlurAdmin.pages.organization.payRoll.salaryHead',
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('organization.payRoll', {
        url: '/payRoll',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'PayRoll',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 100,
        },
      })
  }

})();
