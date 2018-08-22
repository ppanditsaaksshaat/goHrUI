/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.workfromhome', [
        'BlurAdmin.pages.team.attendance.workfromhome.pending',
        'BlurAdmin.pages.team.attendance.workfromhome.approved',
        'BlurAdmin.pages.team.attendance.workfromhome.rejected',
        'BlurAdmin.pages.team.attendance.workfromhome.onhold',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.attendance.workfromhome', {
                url: '/workfromhome',
                templateUrl: 'app/pages/team/attendance/workfromhome/workfromhome.html',
                title: 'Work From Home',
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        // $urlRouterProvider.when('/team/attendance', '/team/attendance/approvals');
    }

})();
