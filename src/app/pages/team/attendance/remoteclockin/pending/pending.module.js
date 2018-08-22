/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.remoteclockin.pending', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.attendance.remoteclockin.pending', {
                url: '/pending',
                templateUrl: 'app/pages/team/attendance/remoteclockin/pending/pending.html',
                title: 'Pending',
                controller: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/team/attendance/remoteclockin', '/team/attendance/remoteclockin/pending');
    }

})();
