/**
 * @author pardeep.pandit
 * created on 09.08.2018
 */
(function () {
    'use strict';

    angular.module( 'BlurAdmin.pages.finances.pay.payslips', [
    ])

        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('finances.pay.payslips', {
                url: '/payslips',
                templateUrl: 'app/pages/finances/pay/payslips/payslips.html',
                title: 'Pay Slips',
                controller: "paySlilsController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
            $urlRouterProvider.when('/finances/pay', '/finances/pay/payslips');
    }
})();
