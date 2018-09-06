/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.directory.empdashboard', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('directory.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/pages/directory/empdashboard/empdashboard.html',
                title: 'Dashboard',
                controller: "dirDashboardController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
            .state('directory.dashboard.modal', {
                abstract: true,
                parent: 'directory.dashboard',
                url: '',
                onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
                    console.log('Open modal');
                    $uibModal.open({
                        template: '<div ui-view="modal"></div>',
                        size: 'top-center-500'
                    }).result.finally(function () {
                        // $state.reload();
                        $state.go('directory.dashboard');
                    });
                }]
            }).state('directory.dashboard.fulldetail', {
                url: '/fulldetail',
                parent: 'directory.dashboard.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/directory/empdashboard/report/fulldetail/fulldetail.html',
                        controller: 'fullDetailController',
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
            }).state('directory.dashboard.department', {
                url: '/department',
                parent: 'directory.dashboard.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/directory/empdashboard/report/department/department.html',
                        controller: 'depatmentController',
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
            }).state('directory.dashboard.gradeandlevel', {
                url: '/gradeandlevel',
                parent: 'directory.dashboard.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/directory/empdashboard/report/gradeandlevel/gradeandlevel.html',
                        controller: 'gradeLevelController',
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
            }).state('directory.dashboard.hasleft', {
                url: '/hasleft',
                parent: 'directory.dashboard.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/directory/empdashboard/report/hasleft/hasleft.html',
                        controller: 'hasleftController',
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
            }).state('directory.dashboard.job', {
                url: '/job',
                parent: 'directory.dashboard.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/directory/empdashboard/report/job/job.html',
                        controller: 'jobDescriptionController',
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
            }).state('directory.dashboard.provisional', {
                url: '/provisional',
                parent: 'directory.dashboard.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/directory/empdashboard/report/provisional/provisional.html',
                        controller: 'provisionalController',
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
            }).state('directory.dashboard.reportingmanager', {
                url: '/reportingmanager',
                parent: 'directory.dashboard.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/directory/empdashboard/report/reportingmanager/reportingmanager.html',
                        controller: 'reportingManagerController',
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
            }).state('directory.dashboard.role', {
                url: '/role',
                parent: 'directory.dashboard.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/directory/empdashboard/report/role/role.html',
                        controller: 'roleController',
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
            }).state('directory.dashboard.shift', {
                url: '/shift',
                parent: 'directory.dashboard.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/directory/empdashboard/report/shift/shift.html',
                        controller: 'shiftController',
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
            }).state('directory.dashboard.withoutreportingmanager', {
                url: '/withoutreportingmanager',
                parent: 'directory.dashboard.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/directory/empdashboard/report/withoutreportingmanager/withoutreportingmanager.html',
                        controller: 'withOutReportingController',
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
            }).state('directory.dashboard.worktype', {
                url: '/worktype',
                parent: 'directory.dashboard.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/directory/empdashboard/report/worktype/worktype.html',
                        controller: 'workTypeController',
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
            })

        $urlRouterProvider.when('/directory', '/directory/dashboard');
    }

})();
