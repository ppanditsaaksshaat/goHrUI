/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave.leave.pending', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.leave.leave.pending', {
                url: '/pending',
                templateUrl: 'app/pages/team/leave/leave/pending/pending.html',
                title: 'Pending',
                controller: "myTeamPendingLeaveController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/team/leave/leave', '/team/leave/leave/pending');
    }

})();
