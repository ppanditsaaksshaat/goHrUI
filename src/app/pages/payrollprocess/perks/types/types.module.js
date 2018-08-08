/**
 * @author pardeep pandit
 * created on 08/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.perks.types', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('payrollprocess.perks.types', {
                url: '/types',
                templateUrl: 'app/pages/payrollprocess/perks/types/types.html',
                title: 'Perks',
                controller: "perkTypesController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/payroll/perks', '/payroll/perks/types');
    }

})();
