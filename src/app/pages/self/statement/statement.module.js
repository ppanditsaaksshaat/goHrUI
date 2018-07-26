/**
 * @author NKM
 * created on 
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.statement', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.statement', {
                url: '/statement',
                templateUrl: 'app/pages/self/statement/statement.html',
                title: 'leave statement',
                controller: "leaveStatementController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 3,
                  },
            })
        //$urlRouterProvider.when('/employees', '/employees/dashboard');
    }

})();
