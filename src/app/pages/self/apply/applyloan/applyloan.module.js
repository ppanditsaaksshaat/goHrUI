/**
 * @author NKM
 * created on 25/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.apply.applyloan', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.apply.applyloan', {
                url: '/applyloan',
                templateUrl: 'app/pages/self/apply/applyloan/applyloan.html',
                title: 'loan',
                controller: "applyLoanController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 3,
                },
            })
        // $urlRouterProvider.when('/selfdir/attendance', '/selfdir/attendance/roster');
    }

})();
