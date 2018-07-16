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
            .state('directory.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/pages/employees/empdashboard/empdashboard.html',
                title: 'Dashboard',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                  },
            })
        $urlRouterProvider.when('/directory', '/directory/dashboard');
    }

})();
