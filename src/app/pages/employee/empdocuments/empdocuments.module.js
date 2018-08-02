/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empdocuments', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {


        $stateProvider
            .state('employee.documents', {
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
            })
            .state('employee.documents.folders', {
                url: '/:category',
                parent: 'employee.documents',
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
            }).state('employee.documents.folders.files', {
                url: '/:folderId/:folderName',
                parent: 'employee.documents.folders',
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
                    order: 1,
                    show: 0
                },
            })
        $urlRouterProvider.when('/employee/{empid}/documents', '/employee/{empid}/documents/myfile');
    }

})();
