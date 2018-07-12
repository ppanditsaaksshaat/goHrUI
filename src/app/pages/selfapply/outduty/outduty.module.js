/**
 * 
 * 
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfapply.outduty', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('selfapply.outduty', {
                url: '/outduty',
                title: 'outduty',
                templateUrl: 'app/pages/selfapply/outduty/outduty.html',
                controller: 'outdutyPageCtrl',
                sidebarMeta: {
                    order: 1,
                },
            }); 
    }

})();
