/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.timesheet.invoicing.payment', [

    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('configuration.timesheet.invoicing.payment', {
                url: '/payment',
                templateUrl: 'app/pages/configuration/timesheet/invoicing/payment/payment.html',
                title: 'payment',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                },
            });
    }

})();