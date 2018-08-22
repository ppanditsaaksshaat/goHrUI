/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.workfromhome.onhold', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.attendance.workfromhome.onhold', {
                url: '/onhold',
                templateUrl: 'app/pages/team/attendance/workfromhome/onhold/onhold.html',
                title: 'Onhold',
                controller: "myTeamOnholdWFHController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
    }

})();
