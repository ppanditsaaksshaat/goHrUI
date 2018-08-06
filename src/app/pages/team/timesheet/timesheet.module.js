/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.timesheet', [
        'BlurAdmin.pages.team.timesheet.approvals',
        'BlurAdmin.pages.team.timesheet.projecttime',
        'BlurAdmin.pages.team.timesheet.weeksummary'
    ])
     .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('team.timesheet', {
                url: '/timesheet',
                templateUrl: 'app/pages/team/timesheet/timesheet.html',
                title: 'TimeSheet',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                  
                },
                order: 5
            })
    }
})();
