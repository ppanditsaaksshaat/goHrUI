/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.perks', [
        'BlurAdmin.pages.payrollprocess.perks.types',
        'BlurAdmin.pages.payrollprocess.perks.assign',     
    ])

        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('payrollprocess.perks', {
                url: '/perks',
                templateUrl: 'app/pages/payrollprocess/perks/perks.html',
                title: 'PERKS',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                },
                order: 4
            })

    }
})();
