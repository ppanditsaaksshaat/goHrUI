/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.adjustment.approved', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.attendance.adjustment.approved', {
                url: '/approved',
                templateUrl: 'app/pages/team/attendance/adjustment/approved/approved.html',
                title: 'Approved',
                controller: "myTeamApprovedAdustmentController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
    }

})();
