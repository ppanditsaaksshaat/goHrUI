/**
 * @author pardeep.pandit
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empdocuments.subchilddoc', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('employee.files', {
                url: '/files',
                templateUrl: 'app/pages/employee/empdocuments/subchilddoc/subchilddoc.html',
                title: 'File',
                controller: "empDocSubChildController",
            })
    }

})();
