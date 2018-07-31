/**
 * @author NKM
 * created on 28.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.statement', [
        'BlurAdmin.pages.self.statement.transactionhistory',
        'BlurAdmin.pages.self.statement.balance',
        'BlurAdmin.pages.self.statement.leavestatement'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.statement', {
                url: '/statement',
                templateUrl: 'app/pages/self/statement/statement.html',
                title: 'leave statement',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 3,
                },
            })
        //$urlRouterProvider.when('/employees', '/employees/dashboard');
    }

})();
