/**
 * 
 * 
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfapply.advance', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('selfapply.advance', {
                url: '/advance',
                title: 'advance',
                templateUrl: 'app/pages/selfapply/advance/advance.html',
                controller: 'selfApplyPageCtrl',
                sidebarMeta: {
                    order: 1,
                },
            }); 
    }

})();
