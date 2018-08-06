/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.payroll.misc.leave', [

    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('configuration.payroll.misc.leave', {
                url: '/leave',
                templateUrl: 'app/pages/configuration/payroll/misc/leave/leave.html',
                title: 'Leave',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                }
            });

            $urlRouterProvider.when('/configuration/payroll/misc', '/configuration/payroll/misc/leave');
    }

})();