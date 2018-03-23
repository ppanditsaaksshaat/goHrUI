
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.masters', [
    'BlurAdmin.pages.payroll.masters.common',
    'BlurAdmin.pages.payroll.masters.salaryHead',
    'BlurAdmin.pages.payroll.masters.paybandtemplate',
    'BlurAdmin.pages.payroll.masters.payband',
    'BlurAdmin.pages.payroll.masters.empPayband',
    'BlurAdmin.pages.payroll.masters.empBenefit',
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,$urlRouterProvider) {
   
    $stateProvider
    .state('payroll.masters', {
      url: '/masters',
      template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
      abstract: true,
      title: 'Masters',
      headerCode: 'Masters',
      sidebarMeta: {
        icon: 'ion-pound',
        order: 6,
      },
    });
  }

})();
