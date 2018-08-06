/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.timeassignments', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.attendance.timeassignments', {
                url: '/timeassignments',
                templateUrl: 'app/pages/team/attendance/timeassignments/timeassignments.html',
                title: 'TIME ASSIGNMENTS',
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        // $urlRouterProvider.when('/team/attendance', '/team/attendance/approvals');
    }

})();
