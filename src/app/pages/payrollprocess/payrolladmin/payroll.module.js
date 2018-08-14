/**
 * @author pardeep.pandit
 * created on 08.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.payrolladmin', [

    ])

        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('payrollprocess.payrolladmin', {
                url: '/payrolladmin',
                templateUrl: 'app/pages/payrollprocess/payrolladmin/payrolladmin.html',
                title: 'Payroll Admin',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 2,
                },
            })
    
    }
})();
