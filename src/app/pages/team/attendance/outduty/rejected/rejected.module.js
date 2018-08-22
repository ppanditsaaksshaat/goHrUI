/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.outduty.rejected', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.attendance.outduty.rejected', {
                url: '/rejected',
                templateUrl: 'app/pages/team/attendance/outduty/rejected/rejected.html',
                title: 'Rejected',
                controller: "myTeamRejectedOutDutyController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
    }

})();
