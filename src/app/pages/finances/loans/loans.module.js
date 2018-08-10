/**
 * @author pardeep.pandit
 * created on 10.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.finances.loans', [
        'BlurAdmin.pages.finances.loans.outstanding',
        'BlurAdmin.pages.finances.loans.cleared',
        'BlurAdmin.pages.finances.loans.requests'
    ])

        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('finances.loans', {
                url: '/loans',
                templateUrl: 'app/pages/finances/loans/loans.html',
                title: 'Loans',
                controller: "finLoansController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
    }
})();
