/**
 * @author Pardeep Pandit
 * created on 04/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.me.about', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('me.about', {
                url: '/about',
                templateUrl: 'app/pages/employee/empsummary/empsummary.html',
                title: 'Summary',
                controller: "empSummaryController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
          
        $urlRouterProvider.when('/me', '/me/about');
    }

})();
