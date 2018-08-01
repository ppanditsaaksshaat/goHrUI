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
                parent:'employee.documents',
                onEnter: ['$state', function ($state) {
                    console.log('folder child state entered')
                }],
                // views: {
                //     'view1@docChild': {
                templateUrl: 'app/pages/employee/empdocuments/childdoc/childdoc.html',
                controller: 'empDocumentController',
                //     }
                // },
                title: 'Folders',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                    show: 0
                },
            }).state('employee.documents.folders.files', {
                url: '/:folderId',
                parent:'employee.documents.folders',
                onEnter: ['$state', function ($state) {
                    console.log('file child state entered')
                }],
                // views: {
                //     'view1@docChild': {
                templateUrl: 'app/pages/employee/empdocuments/subchilddoc/subchilddoc.html',
                controller: "empDocSubChildController",
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
