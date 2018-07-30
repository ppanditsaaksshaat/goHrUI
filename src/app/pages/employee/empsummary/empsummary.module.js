/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empsummary', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('employee.summary', {
                url: '/summary',
                templateUrl: 'app/pages/employee/empsummary/empsummary.html',
                title: 'Summary',
                controller: "empSummaryController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
        $urlRouterProvider.when('/employee/{empid}', '/employee/{empid}/summary');
    }

})();
