/**
 * @author pardeep.pandit
 * created on 29/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.me.job', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('me.job', {
                url: '/job',
                templateUrl: 'app/pages/employee/empjob/empjob.html',
                title: 'Job',
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
