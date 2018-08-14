/**
 * 
 * 
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfdocuments', [
        'BlurAdmin.pages.selfdocuments.drive',
        'BlurAdmin.pages.selfdocuments.folder'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('selfdocuments', {
                url: '/selfdocuments',
                title: 'selfdocuments',
                templateUrl: 'app/pages/selfdocuments/documents.html',
                onEnter: ['$uibModal', '$state', '$rootScope', 'baSidebarService', function ($uibModal, $state, $rootScope, baSidebarService) {

                    if (!baSidebarService.isMenuCollapsed()) {

                        baSidebarService.setMenuCollapsed(true);

                    }
                }],
                controller: 'selfdocumentsPageCtrl',
                sidebarMeta: {
                    order: 1,
                },
            });
    }

})();