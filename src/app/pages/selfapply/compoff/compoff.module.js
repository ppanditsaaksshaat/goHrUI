/**
 * 
 * 
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfapply.compoff', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('selfapply.compoff', {
                url: '/compoff',
                title: 'compoff',
                templateUrl: 'app/pages/selfapply/compoff/compoff.html',
                controller: 'compoffPageCtrl',
                sidebarMeta: {
                    order: 1,
                },
            }); 
    }

})();
