/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.workfromhome.pending', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.attendance.workfromhome.pending', {
                url: '/pending',
                templateUrl: 'app/pages/team/attendance/workfromhome/pending/pending.html',
                title: 'Pending',
                controller: "myTeamPendingWFHController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
                params: {
                    month: null,   // can initialise to default value
                    year: null, // can initialise to default value                    
                }
            })
        $urlRouterProvider.when('/team/attendance/workfromhome', '/team/attendance/workfromhome/pending');
    }

})();
