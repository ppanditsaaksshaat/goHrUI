/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.me.profile', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('me.profile', {
                url: '/profile',
                templateUrl: 'app/pages/employee/empprofile/empprofile.html',
                title: 'Profile',
                controller: "employeeProfileController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })

    }

})();
