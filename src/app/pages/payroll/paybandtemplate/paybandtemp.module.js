/**
 * @author santosh.kushwaha
 * created on 20/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payroll.paybandtemplate', [

    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('payroll.paybandtemplate', {
                url: '/paybandtemplate',
                templateUrl: 'app/pages/payroll/paybandtemplate/paybandtemp.html',
                controller: 'paybandTempController',
                title: 'Payband Template',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 5,
                },
            })
    }

})();
