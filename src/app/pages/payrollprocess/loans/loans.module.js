/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.loans', [
        'BlurAdmin.pages.payrollprocess.loans.outstanding',
        'BlurAdmin.pages.payrollprocess.loans.cleared',
        'BlurAdmin.pages.payrollprocess.loans.requests'
    ])

        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('payrollprocess.loans', {
                url: '/loans',
                templateUrl: 'app/pages/payrollprocess/loans/loans.html',
                title: 'Loans',
                controller: "loansController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                },
                order: 3
            })

    }
})();
