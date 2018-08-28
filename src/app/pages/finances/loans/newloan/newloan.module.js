/**
 * @author NKM
 * created on 28.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.finances.loans.newloan', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('finances.loans.newloan', {
                url: '/newloan',
                templateUrl: 'app/pages/finances/loans/newloan/newloan.html',
                title: 'Loan',
                controller: "finNewLoanController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/finances/loans', '/finances/loans/newloan');
    }

})();
