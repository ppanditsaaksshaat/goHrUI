/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance', [
        'BlurAdmin.pages.team.attendance.approvals',
        'BlurAdmin.pages.team.attendance.timeassignments'
    ])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.attendance', {
                url: '/attendance',
                templateUrl: 'app/pages/team/attendance/attendance.html',
                title: 'Attendance',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                },
                order: 3,
            })
    }
})();
