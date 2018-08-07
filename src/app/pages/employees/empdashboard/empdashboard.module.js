/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employees.empdashboard', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('employees.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/pages/employees/empdashboard/empdashboard.html',
                title: 'Dashboard',
                controller: "",
                controllerAs: ""
            })
        $urlRouterProvider.when('/employees', '/employees/dashboard');
    }

})();
