/**
 * @author NKM
 * created on 25/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.apply.applyattendance', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.apply.applyattendance', {
                url: '/applyattendance',
                templateUrl: 'app/pages/self/apply/applyattendance/applyattendance.html',
                title: 'attendance',
                controller: "applyAttendanceController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        // $urlRouterProvider.when('/selfdir/attendance', '/selfdir/attendance/roster');
    }

})();
