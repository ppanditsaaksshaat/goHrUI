/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.directory.empdirectory', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('directory.employeedirectory', {
                url: '/directory',
                templateUrl: 'app/pages/directory/empdirectory/empdirectory.html',
                title: 'Directory',
                controller: "empDirectoryController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 2,
                  },
            })
       // $urlRouterProvider.when('/directory', '/directory/dashboard');
    }

})();
