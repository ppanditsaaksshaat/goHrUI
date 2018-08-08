/**
 * @author pardeep pandit
 * created on 08/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.loans.requests', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('payrollprocess.loans.requests', {
                url: '/requests',
                templateUrl: 'app/pages/payrollprocess/loans/requests/requests.html',
                title: 'REQUESTS',
                controller: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 3,
                },
            })
     
    }

})();
