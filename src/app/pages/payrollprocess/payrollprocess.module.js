/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess', [
        'BlurAdmin.pages.payrollprocess.overview',
        'BlurAdmin.pages.payrollprocess.payrolladmin',
        'BlurAdmin.pages.payrollprocess.loans',
        'BlurAdmin.pages.payrollprocess.perks',
        'BlurAdmin.pages.payrollprocess.reports',
        
        // 'BlurAdmin.pages.team.timesheet',
        // 'BlurAdmin.pages.team.profileapproval',
        // 'BlurAdmin.pages.team.reports',
    ])

        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('payrollprocess', {
                url: '/payroll',
                templateUrl: 'app/pages/payrollprocess/payrollprocess.html',
                title: 'Payroll',
                controller: "payrollProcessController",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 0,
                },
            })


    }
})();
