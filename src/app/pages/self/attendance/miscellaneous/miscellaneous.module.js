/**
 * @author NKM
 * created on 16/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.attendance.miscellaneous', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.attendance.miscellaneous', {
                url: '/miscellaneous',
                templateUrl: 'app/pages/self/attendance/miscellaneous/miscellaneous.html',
                title: 'monthly',
                controller: "miscellaneousController",
                controllerAs: "miscellaneous",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            }).state('selfdir.attendance.miscellaneous.modal', {
                abstract: true,
                parent: 'selfdir.attendance.miscellaneous',
                url: '',
                onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
                    console.log('Open modal');
                    $uibModal.open({
                        template: '<div ui-view="modal"></div>',
                        size: 'top-center-500'
                    }).result.finally(function () {
                        $state.go('selfdir.attendance.miscellaneous');
                    });
                }]
            }).state('selfdir.attendance.miscellaneous.leave', {
                url: '/leave/:id/{entity:json}',
                parent: 'selfdir.attendance.miscellaneous.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/self/attendance/miscellaneous/applyleave.html',
                        controller: 'appLeaveController',
                        resolve: {
                            entity: function ($stateParams) {
                                return $stateParams.entity;
                            }
                        }
                    }
                },
                title: 'Edit Location',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                    show: 0
                },
            }).state('selfdir.attendance.miscellaneous.attendance', {
                url: '/attendance/:id/{entity:json}',
                parent: 'selfdir.attendance.miscellaneous.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/self/attendance/miscellaneous/applyattendance.html',
                        controller: 'appAttendanceController',
                        resolve: {
                            entity: function ($stateParams) {
                                return $stateParams.entity;
                            }
                        }
                    }
                },
                title: 'Edit Location',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                    show: 0
                },
            }).state('selfdir.attendance.miscellaneous.od', {
                url: '/od/:id/{entity:json}',
                parent: 'selfdir.attendance.miscellaneous.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/self/attendance/miscellaneous/applyod.html',
                        controller: 'applyODController',
                        resolve: {
                            entity: function ($stateParams) {
                                return $stateParams.entity;
                            }
                        }
                    }
                },
                title: 'Edit Location',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                    show: 0
                },
            }).state('selfdir.attendance.miscellaneous.coff', {
                url: '/coff/:id/{entity:json}',
                parent: 'selfdir.attendance.miscellaneous.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/self/attendance/miscellaneous/applycoff.html',
                        controller: 'applyCOffController',
                        resolve: {
                            entity: function ($stateParams) {
                                return $stateParams.entity;
                            }
                        }
                    }
                },
                title: 'Edit Location',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                    show: 0
                },
            });
        $urlRouterProvider.when('/selfdir/attendance', '/selfdir/attendance/miscellaneous');
    }

})();
