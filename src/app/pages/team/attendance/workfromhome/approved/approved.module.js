/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.workfromhome.approved', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.attendance.workfromhome.approved', {
                url: '/approved',
                templateUrl: 'app/pages/team/attendance/workfromhome/approved/approved.html',
                title: 'Approved',
                controller: "myApprovedWFHController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
    }

})();
