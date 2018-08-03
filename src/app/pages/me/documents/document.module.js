/**
 * @author Pardeep Pandit
 * created on 04/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.me.documents', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('me.documents', {
                url: '/documents',
                // abstract: true,
                // views: {
                //     'parent': {
                templateUrl: 'app/pages/employee/empdocuments/empdocuments.html',
                //     }
                // },

                title: 'Documents',
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            }).state('me.documents.folders', {
                url: '/:category',
                parent: 'me.documents',
                onEnter: ['$state', function ($state) {
                    console.log('folder child state entered')
                    //   $state.reload();
                }],
                // views: {
                //     'view1@docChild': {
                templateUrl: 'app/pages/employee/empdocuments/folder/folder.html',
                controller: 'empFolderController',
                //     }
                // },
                title: 'Folders',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                    show: 0
                },
            }).state('me.documents.folders.files', {
                url: '/:folderId/:folderName',
                parent: 'me.documents.folders',
                onEnter: ['$state', function ($state) {
                    console.log('file child state entered')

                }],
                // views: {
                //     'view1@docChild': {
                templateUrl: 'app/pages/employee/empdocuments/file/file.html',
                controller: "empFileController",
                //     }
                // },
                title: 'Files',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    show: 0
                },
            })

        $urlRouterProvider.when('/me/documents', '/me/documents/myfile'); 
    }

})();
