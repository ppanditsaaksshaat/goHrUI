/**
 * @author Pardeep Pandit
 * created on 04/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.profile.summary', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('profile.summary', {
                url: '/summary',
                templateUrl: 'app/pages/employee/empsummary/empsummary.html',
                title: 'Summary',
                controller: "empSummaryController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
          
        $urlRouterProvider.when('/me', '/me/summary');
    }

})();
