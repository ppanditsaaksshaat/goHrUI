/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.me', [
      'BlurAdmin.pages.me.about',
      'BlurAdmin.pages.me.documents',
    // 'BlurAdmin.pages.me.job'
  ])

    .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('me', {
        url: '/me',
        templateUrl: 'app/pages/employee/employee.html',
        title: 'Me',
        controller: "employeeController",
        sidebarMeta: {
          icon: 'ion-pound',
          order: 0,
        },
      }).state('me.profile', {
        url: '/profile',
        templateUrl: 'app/pages/employee/empprofile/empprofile.html',
        title: 'Profile',
        controller: "employeeProfileController",
        controllerAs: "",
        sidebarMeta: {
          icon: 'ion-pound',
          order: 1,
        },
      }).state('me.job', {
        url: '/job',
        templateUrl: 'app/pages/employee/empjob/empjob.html',
        title: 'Job',
        controller: "empJobController",
        controllerAs: "",
        sidebarMeta: {
          icon: 'ion-pound',
          order: 1,
        },
      }).state('me.assets', {
        url: '/assets',
        templateUrl: 'app/pages/employee/empassets/empassets.html',
        title: 'Assets',
        controller: "empAssetController",
        controllerAs: "",
        sidebarMeta: {
          icon: 'ion-pound',
          order: 1,
        },
      })
      .state('me.finances', {
        url: '/finances',
        templateUrl: 'app/pages/employee/empfinances/empfinances.html',
        title: 'Finances',
        controller: "empFinancesController",
        controllerAs: "",
        sidebarMeta: {
          icon: 'ion-pound',
          order: 1,
        },
      })
     // $urlRouterProvider.when('/me', '/me/about');
  }
})();
