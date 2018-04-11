/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.roster.plan', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('rosterplan.plan', {
                url: '/plan',
                title: 'Plan',
                templateUrl: 'app/pages/roster/plan/plan.html',
                controller: 'RosterPlanPageCtrl',
                sidebarMeta: {
                    order: 1,
                },
            });
    }

})();
