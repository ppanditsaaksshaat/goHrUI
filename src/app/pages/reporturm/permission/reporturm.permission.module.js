
/**
 * @author deepak.jain
 * created on 24/04/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.reporturm.permission', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('reporturm.permission', {
                url: '/permission',
                //abstract: true,
                templateUrl: 'app/pages/reporturm/permission/reporturm.permission.html',
                controller: "reporturmPermissionController",
                controllerAs: "reporturmPer",
                title: 'Permission',
                sidebarMeta: {
                    order: 1,
                },
            })
    }
})();
