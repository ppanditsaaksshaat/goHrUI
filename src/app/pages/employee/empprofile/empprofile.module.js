/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('employee.profile', {
                url: '/profile',
                templateUrl: 'app/pages/employee/empprofile/empprofile.html',
                title: 'Profile',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
      //  $urlRouterProvider.when('/employee', '/employee/summary');
    }

})();
