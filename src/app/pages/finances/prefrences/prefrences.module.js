/**
 * @author pardeep.pandit
 * created on 09.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.finances.prefrences', [

    ])

        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('finances.prefrences', {
                url: '/prefrences',
                templateUrl: 'app/pages/finances/prefrences/prefrences.html',
                title: 'Prefrences',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
    }
})();
