/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.directory.employees', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('directory.employees', {
                url: '/employees',
                templateUrl: 'app/pages/directory/employees/employees.html',
                title: 'Employees',
                controller: "dirEmployeesController",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
    }

})();
