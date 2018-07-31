/**
 * @author deepak.jain
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empdocuments', [
        'BlurAdmin.pages.employee.empdocuments.docfile',
        'BlurAdmin.pages.employee.empdocuments.docshared'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('employee.documents', {
                url: '/documents',
                templateUrl: 'app/pages/employee/empdocuments/empdocuments.html',
                title: 'Documents',
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
