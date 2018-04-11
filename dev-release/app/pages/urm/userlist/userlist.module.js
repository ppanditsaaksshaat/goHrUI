
/**
 * @author deepak.jain
 * created on 24/04/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.urm.userlist', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('urm.userlist', {
                url: '/userlist',
                //abstract: true,
                templateUrl: 'app/pages/urm/userlist/userlist.html',
                controller: "userListController",
                controllerAs: "",
                title: 'UserList',
                sidebarMeta: {
                    order: 2,
                },
            })
    }
})();
