/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employees.empexist', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('directory.exist', {
                url: '/exist',
                templateUrl: 'app/pages/employees/empexist/empexist.html',
                title: 'Exist',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 2,
                  },
            })
        //$urlRouterProvider.when('/employees', '/employees/dashboard');
    }

})();
