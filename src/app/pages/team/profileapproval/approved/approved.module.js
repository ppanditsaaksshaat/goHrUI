/**
 * @author pardeep pandit
 * created on 05/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.profileapproval.approved', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.profileapproval.approved', {
                url: '/approved',
                templateUrl: 'app/pages/team/profileapproval/approved/approved.html',
                title: 'APPROVED CHANGES',
                controller: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 2,
                },
            })
    }

})();
