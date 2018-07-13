/**
 * 
 * 
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfapply.leave', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('selfapply.leave', {
                url: '/leave',
                title: 'leave',
                templateUrl: 'app/pages/selfapply/leave/leave.html',
                controller: 'leavePageCtrl',
                sidebarMeta: {
                    order: 1,
                },
            }); 
    }

})();
