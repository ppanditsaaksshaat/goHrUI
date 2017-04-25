
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.empupload', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('organization.empupload', {
                url: '/empupload',
                templateUrl: 'app/pages/organization/empupload/empupload.html',
                controller: "OrgEmpUploadController",
                controllerAs: "tabCtrl",
                title: 'Upload Employee',
                sidebarMeta: {
                    order: 0,
                },
            })

    }

})();
