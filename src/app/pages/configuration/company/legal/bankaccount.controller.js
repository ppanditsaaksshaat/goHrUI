/**
 * @author NKM
 * created on 08.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.company.legal')
        .controller('bankAccountController', bankAccountController);

    /** @ngInject */
    function bankAccountController($scope, dialogModal, editFormService,pageService) {
        //    console.log($state)
        var vm = this;

        $scope.addBankAccount = _saveForm;
        $scope.companyList = [];
        $scope.oldEntity = {};
        $scope.entity = {};

        function _loadController() {
            pageService.getPagData(497).then(_getPageSuccessResult, _getPageErrorResult)
        }
        function _getPageSuccessResult(result) {
            console.log(result)
            $scope.pageInfo = result.pageinfo;
            var searchLists = [];
            var searchListData = {
                field: 'JDEmpId',
                operand: "=",
                value: empId
            }
            searchLists.push(searchListData)
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getTableData(jobTableId, jobPageId, '', '', false, data)
                .then(_getTableDataSuccessResult, _getTableDataErrorResult)
        }
        function _getPageErrorResult(err) {
            console.log(err)
        }

        function _saveForm() {
            console.log('save record')
            // $scope.currentForm = form;
            // if (_validateForm(form)) {
            editFormService.saveForm(496, $scope.entity,
                $scope.oldEntity, 'create', 'Save')
                .then(_saveFormSuccess, _saveFormError)
            // }
        }

        function _validateForm(form) {
            return true;
        }

        function _saveFormSuccess(result) {

            $state.go('configuration.company.locations.location')
        }

        function _saveFormError(err) {
            alert('error')
        }
        _loadController()
    }

})();
