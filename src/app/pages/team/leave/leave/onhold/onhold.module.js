/**
 * @author pardeep pandit
 * created on 17/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave.leave.onhold', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.leave.leave.onhold', {
                url: '/onhold',
                templateUrl: 'app/pages/team/leave/leave/onhold/onhold.html',
                title: 'Onhold',
                controller: "myTeamOnHoldLeaveController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
       
    }

})();
