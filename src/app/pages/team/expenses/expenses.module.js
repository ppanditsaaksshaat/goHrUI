/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.expenses', [
        'BlurAdmin.pages.team.expenses.pending',
        'BlurAdmin.pages.team.expenses.approved',
        'BlurAdmin.pages.team.expenses.past'
    ])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.expenses', {
                url: '/expenses',
                templateUrl: 'app/pages/team/expenses/expenses.html',
                title: 'Expenses',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                },
                order: 4
            })
    }
})();
