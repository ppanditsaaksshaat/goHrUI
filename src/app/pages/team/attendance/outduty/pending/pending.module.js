/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.outduty.pending', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.attendance.outduty.pending', {
                url: '/pending',
                templateUrl: 'app/pages/team/attendance/outduty/pending/pending.html',
                title: 'Pending',
                controller: "myTeamPendingOutDutyController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/team/attendance/outduty', '/team/attendance/outduty/pending');
    }

})();
