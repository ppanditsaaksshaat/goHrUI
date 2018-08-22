/**
 * @author pardeep pandit
 * created on 17/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave.compoff.rejected', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.leave.compoff.rejected', {
                url: '/rejected',
                templateUrl: 'app/pages/team/leave/compoff/rejected/rejected.html',
                title: 'Rejected',
                controller: "myTeamRejectedCompOffController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })

    }

})();
