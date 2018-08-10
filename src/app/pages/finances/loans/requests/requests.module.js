/**
 * @author pardeep pandit
 * created on 08/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.finances.loans.requests', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('finances.loans.requests', {
                url: '/requests',
                templateUrl: 'app/pages/finances/loans/requests/requests.html',
                title: 'REQUESTS',
                controller: "loanRequestController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 3,
                },
            })
     
    }

})();
