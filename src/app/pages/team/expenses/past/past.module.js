/**
 * @author pardeep pandit
 * created on 04/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.expenses.past', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.expenses.past', {
                url: '/past',
                templateUrl: 'app/pages/team/expenses/past/past.html',
                title: 'PAST CALIMS',
                controller: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 3,
                },
            })
    }

})();
