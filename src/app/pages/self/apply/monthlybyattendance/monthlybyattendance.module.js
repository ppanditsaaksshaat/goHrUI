/**
 * @author NKM
 * created on 25/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.apply.monthlybyattendance', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.apply.monthlybyattendance', {
                url: '/monthlybyattendance',
                templateUrl: 'app/pages/self/apply/monthlybyattendance/monthlybyattendance.html',
                title: 'Month-Wise Attendance',
                controller: "monthByAttendanceController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        // $urlRouterProvider.when('/selfdir/attendance', '/selfdir/attendance/roster');
    }

})();
