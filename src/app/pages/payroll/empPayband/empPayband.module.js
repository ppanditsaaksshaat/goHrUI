/**
 * @author deepak.jain
 * created on 24.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payroll.empPayband', [

    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('payroll.empPayband', {
                url: '/empPayband',
                templateUrl: 'app/pages/payroll/empPayband/empPayband.html',
                controller: 'empPaybandController',
                title: 'Employee Band',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 4,
                },
            })
    }

})();
