/**
 * @author pardeep.pandit
 * created on 04/05/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empdocuments.docfile', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('employee.documents.myfile', {
                url: '/myfile',
                templateUrl: 'app/pages/employee/empdocuments/docfile/docfile.html',
                title: 'File',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
          
        $urlRouterProvider.when('/employee/{empid}/documents', '/employee/{empid}/documents/myfile');
    }

})();
