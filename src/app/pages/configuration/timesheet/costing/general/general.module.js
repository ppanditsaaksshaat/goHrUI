/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.timesheet.costing.general', [

    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('configuration.timesheet.costing.general', {
                url: '/general',
                templateUrl: 'app/pages/configuration/timesheet/costing/general/general.html',
                title: 'General',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                },
            });

            $urlRouterProvider.when('/configuration/timesheet/costing', '/configuration/timesheet/costing/general');
    }

})();