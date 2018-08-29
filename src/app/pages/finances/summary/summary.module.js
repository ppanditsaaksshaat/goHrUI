/**
 * @author pardeep.pandit
 * created on 09.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.finances.summary', [
        //    'BlurAdmin.pages.me.about',
        // 'BlurAdmin.pages.me.documents',
        // 'BlurAdmin.pages.me.job'
    ])

        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('finances.summary', {
                url: '/summary',
                templateUrl: 'app/pages/finances/summary/summary.html',
                title: 'Summary',
                controller: "summaryController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/finances', '/finances/summary');
    }
})();
