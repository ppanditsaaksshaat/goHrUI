/**
 * @author pardeep pandit
 * created on 08/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.finances.loans.outstanding', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('finances.loans.outstanding', {
                url: '/outstanding',
                templateUrl: 'app/pages/finances/loans/outstanding/outstanding.html',
                title: 'OUTSTANDING',
                controller: "finLoanOutSandingOController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/finances/loans', '/finances/loans/outstanding');
    }

})();
