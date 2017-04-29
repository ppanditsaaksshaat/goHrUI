/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization', [
    'BlurAdmin.pages.organization.masters',
    'BlurAdmin.pages.organization.employee',
    'BlurAdmin.pages.organization.empadd',
    'BlurAdmin.pages.organization.empedit',
    'BlurAdmin.pages.organization.empupload'
  ])
      .config(routeConfig);
      
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('organization', {
          url: '/organization',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Organization',
          sidebarMeta: {
            icon: 'ion-gear-a',
            order: 100,
          },
        });
  }

})();
