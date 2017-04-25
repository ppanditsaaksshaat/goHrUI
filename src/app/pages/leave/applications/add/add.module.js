
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.leave.appadd', [

    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('leave.appadd', {
                url: '/applications/:action',
                templateUrl: 'app/pages/leave/applications/add/add.html',
                controller: "ApplicationAddController",
                controllerAs: "appCtrl",
                title: 'Application',

            }).state('leave.appedit', {
                url: '/:action/:pageId/:pkId/',
                templateUrl: 'app/pages/leave/applications/add/add.html',
                title: 'Employee Leave Application',
                controller: "ApplicationAddController",
                controllerAs: "appCtrl"
            }).state('leave.approvedapp', {
                url: '/:pageId/:pkId/',
                templateUrl: 'app/pages/leave/applications/applicationapproved/applicationapproved.html',
                title: 'Employee Leave Approval',
                controller: "ApprovedAppController",
                controllerAs: "approvedCtrl"
            });

        //$urlRouterProvider.when('/leave/application', '/leave/applications/25');
    }

})();


