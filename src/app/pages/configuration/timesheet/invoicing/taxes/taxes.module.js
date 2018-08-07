/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.timesheet.invoicing.taxes', [

    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('configuration.timesheet.invoicing.taxes', {
                url: '/taxesssss',
                templateUrl: 'app/pages/configuration/timesheet/invoicing/taxes/taxes.html',
                title: 'taxes',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 3,
                },
            });
    }

})();