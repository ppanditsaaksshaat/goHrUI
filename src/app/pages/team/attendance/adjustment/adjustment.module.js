/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.adjustment', [
        'BlurAdmin.pages.team.attendance.adjustment.pending',
        'BlurAdmin.pages.team.attendance.adjustment.approved',
        'BlurAdmin.pages.team.attendance.adjustment.rejected',
        'BlurAdmin.pages.team.attendance.adjustment.onhold',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.attendance.adjustment', {
                url: '/adjustment',
                templateUrl: 'app/pages/team/attendance/adjustment/adjustment.html',
                title: 'Adjustment',
                controller: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/team/attendance', '/team/attendance/adjustment');
    }

})();
