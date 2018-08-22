/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.outduty.onhold', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.attendance.outduty.onhold', {
                url: '/onhold',
                templateUrl: 'app/pages/team/attendance/outduty/onhold/onhold.html',
                title: 'Onhold',
                controller: "myTeamOnholdOutDutyController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
    }

})();
