/**
 * @author pardeep pandit
 * created on 05/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.profileapproval.pending', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.profileapproval.pending', {
                url: '/pending',
                templateUrl: 'app/pages/team/profileapproval/pending/pending.html',
                title: 'PENDING APPROVAL',
                controller: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/team/profileapproval', '/team/profileapproval/pending');
    }

})();
