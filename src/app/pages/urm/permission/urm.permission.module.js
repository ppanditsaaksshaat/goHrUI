
/**
 * @author deepak.jain
 * created on 24/04/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.urm.permission', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('urm.permission', {
                url: '/permission',
                //abstract: true,
                templateUrl: 'app/pages/urm/permission/urm.permission.html',
                controller: "urmPermissionController",
                controllerAs: "urmPer",
                title: 'Permission',
                sidebarMeta: {
                    order: 1,
                },
            })
    }
})();
