/**
 * @author pardeep pandit
 * created on 08/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.perks.assign', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('payrollprocess.perks.assign', {
                url: '/assign',
                templateUrl: 'app/pages/payrollprocess/perks/assign/assign.html',
                title: 'Employee Assignment',
                controller: "perksAssignController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })

    }

})();
