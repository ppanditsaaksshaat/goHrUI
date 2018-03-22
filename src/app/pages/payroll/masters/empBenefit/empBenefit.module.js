/**
 * @author deepak.jain
 * created on 24.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payroll.masters.empBenefit', [

    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('payroll.masters.empBenefit', {
                url: '/empBenefit',
                templateUrl: 'app/pages/payroll/masters/empBenefit/empBenefit.html',
                controller: 'empBenefitController',
                title: 'Employee Benefit',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 4,
                },
            })
    }

})();
