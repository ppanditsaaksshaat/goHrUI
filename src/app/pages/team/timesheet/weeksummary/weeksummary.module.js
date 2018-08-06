/**
 * @author pardeep pandit
 * created on 05/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.timesheet.weeksummary', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.timesheet.weeksummary', {
                url: '/weeksummary',
                templateUrl: 'app/pages/team/timesheet/weeksummary/weeksummary.html',
                title: 'WEEK SUMMARY',
                controller: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 3,
                },
            })
    }

})();
