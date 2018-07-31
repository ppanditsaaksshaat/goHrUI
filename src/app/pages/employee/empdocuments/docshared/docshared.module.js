/**
 * @author pardeep.pandit
 * created on 31/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empdocuments.docshared', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('employee.documents.shared', {
                url: '/shared',
                templateUrl: 'app/pages/employee/empdocuments/docshared/docshared.html',
                title: 'Shared',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                },
            })
          
      
    }

})();
