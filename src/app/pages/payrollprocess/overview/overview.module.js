/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.overview', [
        //    'BlurAdmin.pages.me.about',
        // 'BlurAdmin.pages.me.documents',
        // 'BlurAdmin.pages.me.job'
    ])

        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('payrollprocess.overview', {
                url: '/overview',
                templateUrl: 'app/pages/payrollprocess/overview/overview.html',
                title: 'Run Payroll',
                controller: "payOverViewController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/payroll', '/payroll/overview');
    }
})();
