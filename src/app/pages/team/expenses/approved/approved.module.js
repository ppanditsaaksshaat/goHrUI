/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.expenses.approved', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.expenses.approved', {
                url: '/approved',
                templateUrl: 'app/pages/team/expenses/approved/approved.html',
                title: 'APPROVED CLAIMS',
                controller: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 2,
                },
            })
    }

})();
