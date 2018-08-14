/**
 * @author pardeep pandit
 * created on 08/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.loans.outstanding', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('payrollprocess.loans.outstanding', {
                url: '/outstanding',
                templateUrl: 'app/pages/payrollprocess/loans/outstanding/outstanding.html',
                title: 'OUTSTANDING',
                controller: "loanOutStandingController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/payroll/loans', '/payroll/loans/outstanding');
    }

})();
