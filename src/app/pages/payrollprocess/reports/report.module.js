/**
 * @author pardeep.pandit
 * created on 08.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.reports', [
    ]).config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('payrollprocess.reports', {
                url: '/reports',
                templateUrl: 'app/pages/payrollprocess/reports/reports.html',
                title: 'Reports',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 5,
                },
            })
    
    }
})();
