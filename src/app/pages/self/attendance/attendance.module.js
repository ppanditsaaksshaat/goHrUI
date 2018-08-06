/**
 * @author NKM
 * created on 16/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.attendance', [
        'BlurAdmin.pages.self.attendance.roster',
        'BlurAdmin.pages.self.attendance.miscellaneous',
        // 'BlurAdmin.pages.self.attendance.daywise',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.attendance', {
                url: '/attendance',
                templateUrl: 'app/pages/self/attendance/attendance.html',
                title: 'attendance',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',             
                },      
                order: 1,
            })
        $urlRouterProvider.when('/selfdir', '/selfdir/attendance');
    }

})();
