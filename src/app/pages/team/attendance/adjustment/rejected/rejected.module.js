/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.adjustment.rejected', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.attendance.adjustment.rejected', {
                url: '/rejected',
                templateUrl: 'app/pages/team/attendance/adjustment/rejected/rejected.html',
                title: 'Rejected',
                controller: "myTeamRejectedAdustmentController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
    }

})();
