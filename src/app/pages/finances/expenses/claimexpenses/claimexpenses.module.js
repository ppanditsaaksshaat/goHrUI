/**
 * @author pardeep.pandit
 * created on 10.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.finances.expenses.claimexpenses', [
    ])

        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('finances.expenses.claimexpenses', {
                url: '/claimexpenses',
                templateUrl: 'app/pages/finances/expenses/claimexpenses/claimexpenses.html',
                title: 'EXPENSES',
                controller: "claimExpensesController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/finances/expenses', '/finances/expenses/claimexpenses');
    }
})();
