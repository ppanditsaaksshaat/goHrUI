/**
 * @author pardeep.pandit
 * created on 09.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.finances.pay', [
        // 'BlurAdmin.pages.finances.pay.salary',
        'BlurAdmin.pages.finances.pay.payslips'
    ])

        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('finances.pay', {
                url: '/pay',
                templateUrl: 'app/pages/finances/pay/pay.html',
                title: 'My Pay',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
    }
})();
