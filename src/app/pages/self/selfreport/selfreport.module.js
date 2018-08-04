// /**
//  * @author NKM
//  * created on 31.07.2018
//  */
// (function () {
//     'use strict';

//     angular.module('BlurAdmin.pages.self.selfreport', [
//         'BlurAdmin.pages.self.selfreport.reportattendancesummary',
//         'BlurAdmin.pages.self.selfreport.reportleavestatement',
//         'BlurAdmin.pages.self.selfreport.reportsalaryslip',
//         'BlurAdmin.pages.self.selfreport.reportsalarystructure',

//     ])
//         .config(routeConfig);

//     /** @ngInject */
//     function routeConfig($stateProvider, $urlRouterProvider) {
//         $stateProvider
//             .state('selfdir.selfreport', {
//                 url: '/selfreport',
//                 templateUrl: 'app/pages/self/selfreport/selfreport.html',
//                 title: 'Report',
//                 controller: "",
//                 controllerAs: "",
//                 sidebarMeta: {
//                     icon: 'ion-pound',
//                     order: 5,
//                 },
//             })

//     }

// })();




/**
 * @author NKM
 * created on 16/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.selfreport', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.selfreport', {
                url: '/selfreport',
                templateUrl: 'app/pages/self/selfreport/selfreport.html',
                title: 'Report',
                controller: "selfreportController",
                controllerAs: "Report",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 5,
                },
            }).state('selfdir.selfreport.modal', {
                abstract: true,
                parent: 'selfdir.selfreport',
                url: '',
                onEnter: ['$uibModal', '$state', function ($uibModal, $state) {
                    console.log('Open modal');
                    $uibModal.open({
                        template: '<div ui-view="modal"></div>',
                        size: 'top-center-500'
                    }).result.finally(function () {
                        // $state.reload();
                        $state.go('selfdir.selfreport');
                    });
                }]
            }).state('selfdir.selfreport.reportattendancesummary', {
                url: '/reportattendance',
                parent: 'selfdir.selfreport.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/self/selfreport/reportattendancesummary/reportattendancesummary.html',
                        controller: 'reportAttendanceController',
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

            .state('selfdir.selfreport.reportleavestatement', {
                url: '/reportleavestatement',
                parent: 'selfdir.selfreport.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/self/selfreport/reportleavestatement/reportleavestatement.html',
                        controller: 'reportLeaveStatementController',
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
            }).state('selfdir.selfreport.salaryslip', {
                url: '/salary',
                parent: 'selfdir.selfreport.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/self/selfreport/reportsalaryslip/reportsalaryslip.html',
                        controller: 'reportSalarySlipController',
                        resolve: {
                            // entity: function ($stateParams) {
                            //     return $stateParams.entity;
                            // }
                        }
                    }
                },
                title: 'Edit Location',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 1,
                    show: 0
                },

            }).state('selfdir.selfreport.salarystructure', {
                url: '/salarystructure',
                parent: 'selfdir.selfreport.modal',
                onEnter: ['$state', function ($state) {
                    console.log($state)
                }],
                views: {
                    'modal@': {
                        templateUrl: 'app/pages/self/selfreport/reportsalarystructure/reportsalarystructure.html',
                        controller: 'reportSalaryStructureController',
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
        // $urlRouterProvider.when('/selfdir/attendance', '/selfdir/attendance/miscellaneous');
    }

})();

