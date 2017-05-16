/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees', [
    'BlurAdmin.pages.organization.employees.list',
    'BlurAdmin.pages.organization.employees.masters',
    // 'BlurAdmin.pages.organization.employees.report'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('organization.employees', {
        url: '/employees',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Employee',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 100,
        },
      });
  }

})();
