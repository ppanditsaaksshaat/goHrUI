
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.leave.applications', [

    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('leave.applications', {
                url: '/app',
                templateUrl: 'app/pages/leave/applications/applications.html',
                controller: "LeaveApplicationController",
                controllerAs: "tabCtrl",
                title: 'Application',
                sidebarMeta: {
                    order: 0,
                },
            })
            
        //$urlRouterProvider.when('/leave/application', '/leave/applications/25');
    }

})();


