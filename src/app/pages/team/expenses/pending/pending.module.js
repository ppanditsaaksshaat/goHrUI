/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.expenses.pending', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.expenses.pending', {
                url: '/pending',
                templateUrl: 'app/pages/team/expenses/pending/pending.html',
                title: 'WAITING FOR APPROVAL',
                controller: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/team/expenses', '/team/expenses/pending');
    }

})();
