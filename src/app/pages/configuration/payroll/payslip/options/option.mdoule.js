/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.payroll.payslip.setting', [

    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('configuration.payroll.payslip.setting', {
                url: '/setting',
                templateUrl: 'app/pages/configuration/payroll/payslip/options/options.html',
                title: 'Payslip Options',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                },
            });

            $urlRouterProvider.when('/configuration/payroll/payslip', '/configuration/payroll/setting');
    }

})();