/**
 * @author pardeep.pandit
 * created on 09.08.2018
 */
(function () {
    'use strict';

    angular.module( 'BlurAdmin.pages.finances.pay.salary', [
    ])

        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('finances.pay.salary', {
                url: '/mysalary',
                templateUrl: 'app/pages/finances/pay/salary/salary.html',
                title: 'My Salary',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
            $urlRouterProvider.when('/finances/pay', '/finances/pay/mysalary');
    }
})();
