/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave', [
        'BlurAdmin.pages.team.leave.leave',
        'BlurAdmin.pages.team.leave.compoff'
    ])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.leave', {
                url: '/leave',
                templateUrl: 'app/pages/team/leave/leave.html',
                title: 'LEAVE',
                controller: "myTeamLeaveController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 2,
                },
            })
    }
})();
