/**
 * @author pardeep pandit
 * created on 17/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave.leave.rejected', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.leave.leave.rejected', {
                url: '/approved',
                templateUrl: 'app/pages/team/leave/leave/rejected/rejected.html',
                title: 'Rejected',
                controller: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })

    }

})();
