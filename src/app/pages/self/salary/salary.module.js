/**
 * @author NKM
 * created on 
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.salary', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.salary', {
                url: '/salary',
                templateUrl: 'app/pages/self/salary/salary.html',
                title: 'salary',
                controller: "salaryPageCtrl",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 3,
                  },
            })
        //$urlRouterProvider.when('/employees', '/employees/dashboard');
    }

})();
