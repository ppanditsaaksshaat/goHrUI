/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.workfromhome.rejected', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.attendance.workfromhome.rejected', {
                url: '/rejected',
                templateUrl: 'app/pages/team/attendance/workfromhome/rejected/rejected.html',
                title: 'Rejected',
                controller: "myTeamRejectedWFHController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
    }

})();
