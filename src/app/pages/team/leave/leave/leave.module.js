/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave.leave', [
        'BlurAdmin.pages.team.leave.leave.pending',
        'BlurAdmin.pages.team.leave.leave.approved',
        'BlurAdmin.pages.team.leave.leave.rejected',
        'BlurAdmin.pages.team.leave.leave.onhold'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.leave.leave', {
                url: '/leave',
                templateUrl: 'app/pages/team/leave/leave/leave.html',
                title: 'Leave',
                controller: "myTeamSubLeaveController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/team/leave', '/team/leave/leave');
    }

})();
