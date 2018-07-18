/**
 * @author NKM
 * created on 16/07/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.attendance.miscellaneous', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('selfdir.attendance.miscellaneous', {
                url: '/miscellaneous',
                templateUrl: 'app/pages/self/attendance/miscellaneous/miscellaneous.html',
                title: 'miscellaneous',
                controller: "",
                controllerAs: "",
                sidebarMeta: {
                    icon: 'ion-pound',
                    order: 1,
                  },
            })
        //$urlRouterProvider.when('/employees', '/employees/dashboard');
    }

})();
