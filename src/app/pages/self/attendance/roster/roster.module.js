/**
 * @author NKM
 * created on 16/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.attendance.roster', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.attendance.roster', {
                url: '/roster',
                templateUrl: 'app/pages/self/attendance/roster/roster.html',
                title: 'roster',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 2,
                },
            })
        // $urlRouterProvider.when('/selfdir/attendance', '/selfdir/attendance/roster');
    }

})();
