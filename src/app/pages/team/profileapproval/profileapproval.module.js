/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.profileapproval', [
    ])
     .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.profileapproval', {
                url: '/profileapproval',
                templateUrl: 'app/pages/team/profileapproval/profileapproval.html',
                title: 'Profile Approval',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 6,
                },
            })
    }
})();
