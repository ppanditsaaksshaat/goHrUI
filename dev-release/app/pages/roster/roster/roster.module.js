/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.roster.roster', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('rosterplan.roster', {
                url: '/roster',
                title: 'Roster',
                templateUrl: 'app/pages/roster/roster/roster.html',
                controller: 'RosterPageCtrl',
                sidebarMeta: {
                    order: 2,
                },
            });
    }

})();
