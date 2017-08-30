/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.general', [
    'BlurAdmin.pages.organization.general.companies',
    'BlurAdmin.pages.organization.general.structure',
    'BlurAdmin.pages.organization.general.orgchart'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('organization.general', {
        url: '/general',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'General Info',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 1,
        },
      });
  }

})();
