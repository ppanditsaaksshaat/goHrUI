/**
 * @author pardeep pandit
 * created on 05/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.timesheet.approvals', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.timesheet.approvals', {
                url: '/approvals',
                templateUrl: 'app/pages/team/timesheet/approvals/approvals.html',
                title: 'APPROVALS',
                controller: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/team/timesheet', '/team/timesheet/approvals');
    }

})();
