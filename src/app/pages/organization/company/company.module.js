/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.company', [
   'BlurAdmin.pages.organization.company.list'
    // 'BlurAdmin.pages.organization.company.structure',
    // 'BlurAdmin.pages.organization.company.orgchart'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('organization.company', {
        url: '/company',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Company Info',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 100,
        },
      }).state('organization.company.add', {
        url: '/:action',
        templateUrl: 'app/pages/organization/company/add/company.add.html',
        title: 'Add Company',
        controller: "addCompanyController",
        controllerAs: "addComCtrl"
      })
  }

})();
