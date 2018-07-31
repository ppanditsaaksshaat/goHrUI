/**
 * @author NKM
 * created on 28/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.statement.balance', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.statement.balance', {
                url: '/balance',
                templateUrl: 'app/pages/self/statement/balance/balance.html',
                title: 'Balance',
                controller: "leaveBalanceController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 2,
                },
            })
        // $urlRouterProvider.when('/selfdir/attendance', '/selfdir/attendance/roster');
    }

})();
