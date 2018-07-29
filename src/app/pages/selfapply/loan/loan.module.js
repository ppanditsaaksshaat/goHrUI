/**
 * 
 * 
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfapply.loan', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('selfapply.loan', {
                url: '/loan',
                title: 'loan',
                templateUrl: 'app/pages/selfapply/loan/loan.html',
                controller: 'leavePageCtrl',
                sidebarMeta: {
                    order: 1,
                },
            }); 
    }

})();
