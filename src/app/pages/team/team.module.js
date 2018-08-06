/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team', [
        'BlurAdmin.pages.team.summary',
        'BlurAdmin.pages.team.leave',
        'BlurAdmin.pages.team.attendance',
        'BlurAdmin.pages.team.expenses',
        'BlurAdmin.pages.team.timesheet',
        'BlurAdmin.pages.team.profileapproval',
        'BlurAdmin.pages.team.reports',
    ])

        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team', {
                url: '/team',
                templateUrl: 'app/pages/team/team.html',
                title: 'Team',
                controller: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 0,
                },
            })


    }
})();
