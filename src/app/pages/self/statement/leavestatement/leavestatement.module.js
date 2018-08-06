/**
 * @author NKM
 * created on 28/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.statement.leavestatement', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.statement.leavestatement', {
                url: '/leavestatement',
                templateUrl: 'app/pages/self/statement/leavestatement/leavestatement.html',
                title: 'Leave Statement',
                controller: "leaveStatementController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 3,
                },
            })
        // $urlRouterProvider.when('/selfdir/statement', '/selfdir/statement/transactionhistory');
    }

})();
