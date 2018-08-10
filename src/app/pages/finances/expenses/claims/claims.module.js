/**
 * @author pardeep.pandit
 * created on 10.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.finances.expenses.claims', [
    ])

        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('finances.expenses.claims', {
                url: '/claims',
                templateUrl: 'app/pages/finances/expenses/claims/claims.html',
                title: 'PAST CLAIMS',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
    
    }
})();
