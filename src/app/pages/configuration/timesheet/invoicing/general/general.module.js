/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.invoicing.general', [

    ]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('configuration.invoicing.general', {
                url: '/general',
                templateUrl: 'app/pages/configuration/invoicing/general/general.html',
                title: 'General',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                },
            });

            $urlRouterProvider.when('/configuration/invoicing', '/configuration/invoicing/general');
    }

})();