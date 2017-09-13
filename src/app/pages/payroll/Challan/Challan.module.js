
/**
 * @author nitesh
 * created on 11.09.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payroll.Challan', [
        'BlurAdmin.pages.payroll.Challan.NSSF',
        'BlurAdmin.pages.payroll.Challan.PPF',
        'BlurAdmin.pages.payroll.Challan.chakuwase',
        'BlurAdmin.pages.payroll.Challan.chowdau',
        'BlurAdmin.pages.payroll.Challan.paye',
        'BlurAdmin.pages.payroll.Challan.serviceDetail',
        'BlurAdmin.pages.payroll.Challan.wcf',
        'BlurAdmin.pages.payroll.Challan.wcfHeader',
    ])
        .config(routeConfig);


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('payroll.Challan', {
                url: '/Challan',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: 'Challan Report',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 17,
                },
            })
    }

})();
