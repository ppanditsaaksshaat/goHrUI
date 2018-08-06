/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.profileapproval', [
        'BlurAdmin.pages.team.profileapproval.pending',
        'BlurAdmin.pages.team.profileapproval.approved'
    ])
     .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.profileapproval', {
                url: '/profileapproval',
                templateUrl: 'app/pages/team/profileapproval/profileapproval.html',
                title: 'PROFILE APPROVAL',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 6,
                },
            })
    }
})();
