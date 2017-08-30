/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization', [
    'BlurAdmin.pages.organization.employees.masters',
    'BlurAdmin.pages.organization.employees',
    // 'BlurAdmin.pages.organization.employee',
    // 'BlurAdmin.pages.organization.empupload',
    // 'BlurAdmin.pages.organization.masters',
<<<<<<< HEAD
    'BlurAdmin.pages.organization.general',
    // 'BlurAdmin.pages.organization.employees.report'
    'BlurAdmin.pages.organization.reports',
=======
    // 'BlurAdmin.pages.organization.general',
    'BlurAdmin.pages.organization.employees.reports'
>>>>>>> 1eefd4014a2c72e07637d385c2b57194f80b510e
    
    
    // 'BlurAdmin.pages.organization.empadd',
    // 'BlurAdmin.pages.organization.empedit',
    
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
            icon: 'ion-ios-people',
            order: 1,
          },
        });
  }

})();
