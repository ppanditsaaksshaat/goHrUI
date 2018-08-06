/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.timesheet.invoicing.general', [

    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('configuration.timesheet.invoicing.general', {
                url: '/general',
                templateUrl: 'app/pages/configuration/timesheet/invoicing/general/general.html',
                title: 'General',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                },
            });
    }

})();