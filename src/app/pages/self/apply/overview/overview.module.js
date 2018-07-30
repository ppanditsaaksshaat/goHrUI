/**
 * @author NKM
 * created on 25/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.apply.overview', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.apply.overview', {
                url: '/overview',
                templateUrl: 'app/pages/self/apply/overview/overview.html',
                title: 'OverView',
                controller: "overViewController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 0,
                },
            })
            $urlRouterProvider.when('/selfdir/apply', '/selfdir/apply/overview');
    }

})();
