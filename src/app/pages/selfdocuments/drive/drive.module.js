/**
 * 
 * 
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfdocuments.drive', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('selfdocuments.drive', {
                url: '/:type',
                title: 'My Drive',
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