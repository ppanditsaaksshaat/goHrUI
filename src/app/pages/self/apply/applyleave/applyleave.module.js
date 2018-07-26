/**
 * @author NKM
 * created on 25/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.apply.applyleave', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.apply.applyleave', {
                url: '/apply leave',
                templateUrl: 'app/pages/self/apply/applyleave/applyleave.html',
                title: 'leave',
                controller: "applyLeaveController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 2,
                },
            })
        // $urlRouterProvider.when('/selfdir/attendance', '/selfdir/attendance/roster');
    }

})();
