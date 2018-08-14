/**
 * @author pardeep pandit
 * created on 08/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.finances.loans.cleared', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('finances.loans.cleared', {
                url: '/cleared',
                templateUrl: 'app/pages/finances/loans/cleared/cleared.html',
                title: 'CLEARED',
                controller: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 2,
                },
            })
     
    }

})();
