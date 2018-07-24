/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empjob', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('employee.job', {
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
