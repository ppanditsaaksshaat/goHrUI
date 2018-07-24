/**
 * @author NKM
 * 
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.apply', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.apply', {
                url: '/apply',
                templateUrl: 'app/pages/self/apply/apply.html',
                title: 'apply',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 2,
                  },
            })
        //$urlRouterProvider.when('/employees', '/employees/dashboard');
    }

})();
