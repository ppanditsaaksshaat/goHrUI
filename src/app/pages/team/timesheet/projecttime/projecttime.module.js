/**
 * @author pardeep pandit
 * created on 05/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.timesheet.projecttime', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.timesheet.projecttime', {
                url: '/projecttime',
                templateUrl: 'app/pages/team/timesheet/projecttime/projecttime.html',
                title: 'PROJECT TIME',
                controller: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 2,
                },
            })
    }

})();
