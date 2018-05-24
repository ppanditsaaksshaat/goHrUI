
/**
 * @author santosh.kushwaha
 * created on 20.05.2017
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.mis.masterReport', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
  
      $stateProvider
        .state('mis.masterReport', {
          url: '/report/',
          // abstract: true,
          templateUrl: 'app/pages/misreport/masterReport/masterReport.html',
          controller: "masterReportController",
          controllerAs: "masterReport",
          title: 'Master Report',
          sidebarMeta: {
            order: 1,
            parent: 'mis',
            pageTitle: 'MIS Report'
          },
        })
    }
  
  })();
  