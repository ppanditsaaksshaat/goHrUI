/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.directory.empanalytics', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('directory.empanalytics', {
                url: '/analytics',
                templateUrl: 'app/pages/directory/empanalytics/empanalytics.html',
                title: 'Analytics',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 3,
                  },
            })
        //$urlRouterProvider.when('/employees', '/employees/dashboard');
    }

})();
