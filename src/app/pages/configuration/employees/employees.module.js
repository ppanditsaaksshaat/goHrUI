/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.configuration.employee', [
    // 'BlurAdmin.pages.configuration.employee.jobprofile',
    // 'BlurAdmin.pages.configuration.employee.defaults',
    // 'BlurAdmin.pages.configuration.employee.fieldsettings',
    // 'BlurAdmin.pages.configuration.employee.documenttype'
    'BlurAdmin.pages.configuration.employee.title',
    'BlurAdmin.pages.configuration.employee.gender',
    'BlurAdmin.pages.configuration.employee.maritalstatus',
    'BlurAdmin.pages.configuration.employee.employment',
    'BlurAdmin.pages.configuration.employee.category',
    'BlurAdmin.pages.configuration.employee.employeestatus',
    'BlurAdmin.pages.configuration.employee.retionsheep',
    'BlurAdmin.pages.configuration.employee.bankbranch',
    'BlurAdmin.pages.configuration.employee.qualification',
    'BlurAdmin.pages.configuration.employee.otherqualification',
    'BlurAdmin.pages.configuration.employee.skill',
    'BlurAdmin.pages.configuration.employee.identity',
  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('configuration.employee', {
        url: '/employee',
        template: "<top-nav menu=\"'configuration.employee'\"></top-nav>",
        //controller: 'companyController',
        title: 'Leave & Holiday',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
      });
    $urlRouterProvider.when('/configuration/employee', '/configuration/employee/title');

  }

})();
