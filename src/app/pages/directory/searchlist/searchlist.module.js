/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.directory.searchlist', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('directory.searchlist', {
                url: '/searchlist',
                templateUrl: 'app/pages/directory/searchlist/searchlist.html',
                title: 'Search',
                controller: "searchListController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 5,
                },
            })
    }

})();
