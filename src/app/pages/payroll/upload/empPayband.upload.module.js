

/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.payroll.upload', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
  
      $stateProvider
        .state('payroll.upload', {
          url: '/upload',
          // abstract: true,
          templateUrl: 'app/pages/payroll/upload/empPayband.upload.html',
          controller: 'empPaybandUploadController',
          sidebarMeta: {
            order: 1,
            pageTitle: 'Employee Payband Upload'
          },
        })
    }
  
  })();
  