/**
 * @author NKM
 * created on 28/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.statement.transactionhistory', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.statement.transactionhistory', {
                url: '/transactionhistory',
                templateUrl: 'app/pages/self/statement/transactionhistory/transactionhistory.html',
                title: 'Transaction History',
                controller: "transanctionHistoryController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 2,
                },
            })
        $urlRouterProvider.when('/selfdir/statement', '/selfdir/statement/transactionhistory');
    }

})();
