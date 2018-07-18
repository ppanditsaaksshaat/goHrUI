/**
 * @author NKM
 * created on 16/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.attendance.daywise', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.attendance.daywise', {
                url: '/daywise',
                templateUrl: 'app/pages/self/attendance/daywise/daywise.html',
                title: 'daywise',
                controller: "daywiseController",
                controllerAs: "daywise",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 0,
                },
            })
        $urlRouterProvider.when('/selfdir/attendance', '/selfdir/attendance/daywise');
    }

})();
