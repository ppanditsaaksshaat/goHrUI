/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.payroll.setup')
        .controller('payrollSetupController', payrollSetupController);

    /** @ngInject */
    function payrollSetupController($scope, $rootScope, $state, $filter, pageService, dialogModal) {
        var vm = this;
        $scope.setupList = [];
        $scope.isSalaryCycle = false;
        $scope.showListGeneralPayrollSetting = _showListGeneralPayrollSetting;
        $scope.addGeneralPayrollSetting = _addGeneralPayrollSetting;
        $scope.editGeneralPayrollSetting = _editGeneralPayrollSetting;

        $rootScope.$on("CallParentMethod", function () {
            _loadController()
        }); 

        function _loadController() {
            var data = {
                searchList: [],
                orderByList: []
            }
            pageService.getTableData(335, 331, '', '', false, data)
                .then(_getTableDataSuccessResult, _getTableDataErrorResult)
        }
        function _getTableDataSuccessResult(result) {
            console.log(result);
            $scope.cycleList = result;
        }

        function _getTableDataErrorResult(error) {
            console.log(error);
        }

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

        function _showListGeneralPayrollSetting() {
            console.log('General')
            $scope.isSalaryCycle = true;
        }

        function _addGeneralPayrollSetting() {
            $scope.modalInstance = dialogModal.open({
                url: 'app/pages/configuration/payroll/setup/generalpayrollsetting/generalpayrollsetting.html',
                size: 'top-center-600',
                controller: 'generalPayrollSettingController',
            })
        }

        function _editGeneralPayrollSetting(row) {
            console.log(row)
            console.log('emp upload')
            var modal = dialogModal.open({
                url: 'app/pages/configuration/payroll/setup/generalpayrollsetting/generalpayrollsetting.html',
                size: 'top-center-600',
                controller: 'generalPayrollSettingController',
                param: row
            });
        }

        _loadController()



    }
})();