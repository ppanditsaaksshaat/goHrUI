/**
 * @author santosh.kushwaha
 * created on 20/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payroll.masters.payband', [

    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('payroll.masters.payband', {
                url: '/payband',
                templateUrl: 'app/pages/payroll/masters/payband/payband.html',
                controller: 'paybandController',
                title: 'Payband',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 4,
                },
            })
    }

})();
