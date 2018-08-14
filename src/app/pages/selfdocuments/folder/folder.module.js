/**
 * 
 * 
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfdocuments.folder', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('selfdocuments.folder', {
                url: '/folder',
                title: 'Folder',
                templateUrl: 'app/pages/selfdocuments/drive/drive.html',
                onEnter: ['$uibModal', '$state', '$rootScope', 'baSidebarService', 'DJWebStore', function ($uibModal, $state, $rootScope, baSidebarService, DJWebStore) {

                    
                    if (!baSidebarService.isMenuCollapsed()) {

                        baSidebarService.setMenuCollapsed(true);

                    }
                }],
                controller: 'driveController',
                sidebarMeta: {
                    order: 1,
                },
            });
    }

})();