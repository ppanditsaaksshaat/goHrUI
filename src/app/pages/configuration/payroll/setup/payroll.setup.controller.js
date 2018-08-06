/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.payroll.setup')
        .controller('payrollSetupController', payrollSetupController);

    /** @ngInject */
    function payrollSetupController($scope, $rootScope, $state, $filter, pageService) {
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

    }
})();