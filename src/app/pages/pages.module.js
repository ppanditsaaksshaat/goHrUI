/**
 * @author v.lugovsky Satyendra and deepak 
 * created on 16.12.2015
 */
(function () {
  'use strict';


  angular.module('BlurAdmin.pages', [
    'ui.router',
    'BlurAdmin.pages.dashboard',
    // 'BlurAdmin.pages.ui',
    // 'BlurAdmin.pages.components',
    // 'BlurAdmin.pages.form',
    // 'BlurAdmin.pages.tables',
    // 'BlurAdmin.pages.charts',
    // 'BlurAdmin.pages.maps',
    'BlurAdmin.pages.help',
    'BlurAdmin.pages.urm',
    'BlurAdmin.pages.organization',
    'BlurAdmin.pages.time',
    'BlurAdmin.pages.leave',
    'BlurAdmin.pages.attendance',
    'BlurAdmin.pages.payroll',
    'BlurAdmin.pages.loan',
    'BlurAdmin.pages.advance',
    'BlurAdmin.pages.mis',
    'BlurAdmin.pages.configuration',
    'BlurAdmin.pages.me',
    'BlurAdmin.pages.tds',
    'BlurAdmin.pages.roster',
    'BlurAdmin.pages.device',
    'BlurAdmin.pages.selfdashboard',
    'BlurAdmin.pages.selfattendance',
    'BlurAdmin.pages.selfsalary',
    'BlurAdmin.pages.selfapply',
    'BlurAdmin.pages.selfdocuments',
    'BlurAdmin.pages.selfapprovals',
    // 'BlurAdmin.pages.employees',
    'BlurAdmin.pages.directory',
    'BlurAdmin.pages.employee',
    'BlurAdmin.pages.self',
    'BlurAdmin.pages.team',
    'BlurAdmin.pages.payrollprocess',
    'BlurAdmin.pages.finances',
    'BlurAdmin.pages.reports',
    'BlurAdmin.pages.reporturm'
    
    

  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/selfdashboard');

    // baSidebarServiceProvider.addStaticItem({
    //   title: 'Pages',
    //   icon: 'ion-document',
    //   subMenu: [{
    //     title: 'Sign In',
    //     fixedHref: 'auth.html',
    //     blank: true
    //   }, {
    //     title: 'Sign Up',
    //     fixedHref: 'reg.html',
    //     blank: true
    //   }, {
    //     title: 'User Profile',
    //     stateRef: 'profile'
    //   }, {
    //     title: '404 Page',
    //     fixedHref: '404.html',
    //     blank: true
    //   }]
    // });
    // baSidebarServiceProvider.addStaticItem({
    //   title: 'Menu Level 1',
    //   icon: 'ion-ios-more',
    //   subMenu: [{
    //     title: 'Menu Level 1.1',
    //     disabled: true
    //   }, {
    //     title: 'Menu Level 1.2',
    //     subMenu: [{
    //       title: 'Menu Level 1.2.1',
    //       disabled: true
    //     }]
    //   }]
    // });
  }

})();
