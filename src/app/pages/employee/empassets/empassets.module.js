/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empassets', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('employee.assets', {
                url: '/assets',
                templateUrl: 'app/pages/employee/empassets/empassets.html',
                title: 'Assets',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
      //  $urlRouterProvider.when('/employee', '/employee/summary');
    }

})();
