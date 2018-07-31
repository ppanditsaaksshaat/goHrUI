/**
 * @author NKM
 * created on 31.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.selfreport', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.selfreport', {
                url: '/selfreport',
                templateUrl: 'app/pages/self/selfreport/selfreport.html',
                title: 'Report',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 5,
                },
            })
      
    }

})();
