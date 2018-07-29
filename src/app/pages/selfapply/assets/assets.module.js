/**
 * 
 * 
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfapply.assets', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('selfapply.assets', {
                url: '/assets',
                title: 'assets',
                templateUrl: 'app/pages/selfapply/assets/assets.html',
                controller: 'assetsPageCtrl',
                sidebarMeta: {
                    order: 1,
                },
            }); 
    }

})();
