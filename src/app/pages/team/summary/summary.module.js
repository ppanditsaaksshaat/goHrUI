/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.summary', [
        //    'BlurAdmin.pages.me.about',
        // 'BlurAdmin.pages.me.documents',
        // 'BlurAdmin.pages.me.job'
    ])

        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.summary', {
                url: '/summary',
                templateUrl: 'app/pages/team/summary/summary.html',
                title: 'Summary',
                controller: "myTeamSummaryController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/team', '/team/summary');
    }
})();
