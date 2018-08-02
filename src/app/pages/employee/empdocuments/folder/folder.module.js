/**
 * @author pardeep.pandit
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empdocuments.childdoc', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('employee.documents.myfile', {
                url: '/myfile',
                templateUrl: 'app/pages/employee/empdocuments/childdoc/childdoc.html',
                title: 'File',
                controller: "empDocumentController",
            }).state('employee.documents.sharedwithme', {
                url: '/sharedwithme',
                templateUrl: 'app/pages/employee/empdocuments/childdoc/childdoc.html',
                title: 'File',
                controller: "empDocumentController",
                controllerAs: "",

            }).state('employee.documents.public', {
                url: '/public',
                templateUrl: 'app/pages/employee/empdocuments/childdoc/childdoc.html',
                title: 'Shared',
                controller: "empDocumentController",
                controllerAs: "",
            })
            .state('employee.documents.sharedwithother', {
                url: '/sharedwithother',
                templateUrl: 'app/pages/employee/empdocuments/childdoc/childdoc.html',
                title: 'Shared',
                controller: "empDocumentController",
                controllerAs: "",
            })


        $urlRouterProvider.when('/employee/{empid}/documents', '/employee/{empid}/documents/myfile');
    }

})();
