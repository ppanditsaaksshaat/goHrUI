
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.loan.loanmanagement', [

    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('loan.loanmanagement', {
                url: '/app',
                templateUrl: 'app/pages/loan/loanmanagement/loanapplication.html',
                controller: "LoanApplicationController",
                controllerAs: "tabCtrl",
                title: 'Loan Application',
                sidebarMeta: {
                    order: 0,
                },
            })
            
        //$urlRouterProvider.when('/leave/application', '/leave/applications/25');
    }

})();


