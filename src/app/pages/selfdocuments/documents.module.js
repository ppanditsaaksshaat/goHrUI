/**
 * 
 * 
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfdocuments', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('selfdocuments', {
                url: '/selfdocuments',
                title: 'selfdocuments',
                templateUrl: 'app/pages/selfdocuments/documents.html',
                controller: 'selfdocumentsPageCtrl',
                sidebarMeta: {
                    order: 1,
                },
            }); 
    }

})();
