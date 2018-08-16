/**
 * @author NKM
 * created on 16.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.payroll.setup')
        .controller('payrollSetupController', payrollSetupController);

    /** @ngInject */
    function payrollSetupController($scope, $rootScope, $state, $filter, pageService, dialogModal) {
        $scope.setupList = [];

        $scope.setupList.push({
            id: 1,
            sr: 1,
            status: 'pending',
            title: 'Company Configuration',
            desc: 'Company Information, Bank Account, etc.'
        });

        $scope.setupList.push({
            id: 1,
            sr: 1,
            status: 'pending',
            title: 'Company Configuration',
            desc: 'Company Information, Bank Account, etc.'
        });

        $scope.addGeneralPayrollSetting = function () {
            console.log('General')
            $scope.modalInstance = dialogModal.open({
                url: 'app/pages/configuration/payroll/setup/generalpayrollsetting/generalpayrollsetting.html',
                size: 'top-center-600',
                controller: '',
            })
        }

    }
})();