/**
 * @author pardeep.pandit
 * created on 09.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.finances.expenses', [
        'BlurAdmin.pages.finances.expenses.claimexpenses',
        'BlurAdmin.pages.finances.expenses.claims'
    ])

        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('finances.expenses', {
                url: '/expenses',
                templateUrl: 'app/pages/finances/expenses/expenses.html',
                title: 'Expenses',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
    }
})();
