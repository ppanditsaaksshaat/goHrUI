/**
 * 
 * 
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfsalary', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('selfsalary', {
                url: '/selfsalary',
                title: 'selfsalary',
                templateUrl: 'app/pages/selfsalary/selfsalary.html',
                controller: 'selfsalaryPageCtrl',
                sidebarMeta: {
                    order: 1,
                },
            }); 
    }

})();
