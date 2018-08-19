/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave.compoff', [
        'BlurAdmin.pages.team.leave.compoff.pending',
        'BlurAdmin.pages.team.leave.compoff.approved',
        'BlurAdmin.pages.team.leave.compoff.rejected',
        'BlurAdmin.pages.team.leave.compoff.onhold'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.leave.compoff', {
                url: '/compoff',
                templateUrl: 'app/pages/team/leave/compoff/compoff.html',
                title: 'Comp Off',
                controller: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })

    }

})();
