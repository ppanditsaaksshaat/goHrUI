/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.payroll.payrollfnf', [

    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('configuration.payroll.payrollfnf', {
                url: '/payrollfnf',
                templateUrl: 'app/pages/configuration/payroll/fandf/fNf.html',
                title: 'Full and Final',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                },
            });

    }

})();