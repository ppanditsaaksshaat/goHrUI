/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.remoteclockin', [
        'BlurAdmin.pages.team.attendance.remoteclockin.pending',
        'BlurAdmin.pages.team.attendance.remoteclockin.approved',
        'BlurAdmin.pages.team.attendance.remoteclockin.rejected',
        'BlurAdmin.pages.team.attendance.remoteclockin.onhold',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.attendance.remoteclockin', {
                url: '/remoteclockin',
                templateUrl: 'app/pages/team/attendance/remoteclockin/remoteclockin.html',
                title: 'Remote Clock-In',
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        // $urlRouterProvider.when('/team/attendance', '/team/attendance/approvals');
    }

})();
