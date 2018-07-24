/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empfinances', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('employee.finances', {
                url: '/finances',
                templateUrl: 'app/pages/employee/empfinances/empfinances.html',
                title: 'Finances',
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
