/**
 * @author deepak.jain
 * created on 24.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payroll.masters.empPayband', [

    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('payroll.masters.empPayband', {
                url: '/empPayband',
                templateUrl: 'app/pages/payroll/masters/empPayband/empPayband.html',
                controller: 'empPaybandController',
                title: 'Employee Band',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 4,
                },
            })
    }

})();
