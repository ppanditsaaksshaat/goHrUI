/**
 * @author santosh.kushwaha
 * created on 20/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payroll.payband', [

    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('payroll.payband', {
                url: '/payband',
                templateUrl: 'app/pages/payroll/payband/payband.html',
                controller: 'paybandController',
                title: 'Payband',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 4,
                },
            })
    }

})();
