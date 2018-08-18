/**
 * @author pardeep pandit
 * created on 17/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave.leave.approved', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.leave.leave.approved', {
                url: '/approved',
                templateUrl: 'app/pages/team/leave/leave/approved/approved.html',
                title: 'Approved',
                controller: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
       
    }

})();
