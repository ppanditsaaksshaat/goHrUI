/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.outduty', [
        'BlurAdmin.pages.team.attendance.outduty.pending',
        'BlurAdmin.pages.team.attendance.outduty.approved',
        'BlurAdmin.pages.team.attendance.outduty.rejected',
        'BlurAdmin.pages.team.attendance.outduty.onhold',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.attendance.outduty', {
                url: '/outduty',
                templateUrl: 'app/pages/team/attendance/outduty/outduty.html',
                title: 'Outduty',
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        // $urlRouterProvider.when('/team/attendance', '/team/attendance/approvals');
    }

})();
