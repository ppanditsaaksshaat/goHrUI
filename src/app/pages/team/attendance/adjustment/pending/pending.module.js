/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.adjustment.pending', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.attendance.adjustment.pending', {
                url: '/pending',
                templateUrl: 'app/pages/team/attendance/adjustment/pending/pending.html',
                title: 'Pending',
                controller: "myTeamPendingAdustmentController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/team/attendance/adjustment', '/team/attendance/adjustment/pending');
    }

})();
